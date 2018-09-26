
(function (window, $, React, ReactDOM, $pt) {
        var NInputAndSelect = React.createClass($pt.defineCellComponent({
            displayName: 'NInputAndSelect',


//displayName: 'NSelect',
            mixins: [$pt.mixins.PopoverMixin],
            statics: {
                POP_FIX_ON_BOTTOM: false,
                PLACEHOLDER: "Please Select...",
                NO_OPTION_FOUND: 'No Option Found',
                FILTER_PLACEHOLDER: 'Search...',
                CLOSE_TEXT: 'Close',
                CLEAR_TEXT: 'Clear'
            },
            getDefaultProps: function () {
                return {
                    defaultOptions: {
                        allowClear: true,
                        minimumResultsForSearch: 1,
                        data: [],


                        availableWhenNoParentValue: false
                    }
                };
            },
            beforeDidUpdate: function (prevProps, prevState) {
                this.initSetValues();
            },
            beforeDidMount: function () {
// set model value to component
                this.initSetValues();
            },
            afterWillUpdate: function (nextProps) {
                if (this.hasParent()) {
// add post change listener into parent model
//this.getParentModel().removePostChangeListener(this.getParentPropertyId(), this.onParentModelChanged);
                }
            },
            afterDidUpdate: function (prevProps, prevState) {
                if (this.hasParent()) {
// remove post change listener from parent model
//this.getParentModel().addPostChangeListener(this.getParentPropertyId(), this.onParentModelChanged);
                }
                this.checkLoadingState();
            },
            afterDidMount: function () {
                this.checkLoadingState();
            },
            checkLoadingState: function () {
                if (this.state.onloading && !this.state.alreadySendRequest) {
                    if (this.hasParent()) {
// add post change listener into parent model
                        this.getParentModel().addPostChangeListener(this.getParentPropertyId(), this.onParentModelChanged);
                        var parentValue = this.getParentPropertyValue();
                        if (parentValue == null) {
// no parent value
                            if (this.isAvailableWhenNoParentValue()) {
                                this.getCodeTable().initializeRemote().done(function () {
                                    this.setState({onloading: false});
                                }.bind(this));
                            } else {
                                this.getCodeTable().setAsRemoteInitialized();
                                this.setState({onloading: false});
                            }
                        } else {
                            this.getCodeTable().loadRemoteCodeSegment(parentValue).done(function () {
                                this.setState({onloading: false});
                            }.bind(this));
                        }
                    } else {
                        this.getCodeTable().initializeRemote().done(function () {
                            this.setState({onloading: false});
                        }.bind(this));
                    }
                }
            },
            afterWillUnmount: function () {
                if (this.hasParent()) {
// remove post change listener from parent model
                    this.getParentModel().removePostChangeListener(this.getParentPropertyId(), this.onParentModelChanged);
                }
            },
            getCurrentDisplayText: function () {
                var value = this.getValueFromModel();
                var itemText = null;
                if (value) {
                    console.log("value" + value)
                    var number = value.indexOf(",");
                    if (number != -1) {
                        itemText = value.substring(number + 1)
                    } else {
                        if (!this.refs.code.value) {
                            itemText = value
                        }
                    }
                }
                console.log("itemText" + itemText)
                if (!itemText) {
                    itemText = this.state.onloading ? $pt.Components.NCodeTableWrapper.ON_LOADING : this.isViewMode() ? '' : this.getPlaceholder();
                }
                return itemText;
            },
            /**
             * render
             * @returns {XML}
             */
            renderOptions: function (options, filterText) {
                if (options == null || options.length == 0) {
                    return null;
                }
                if (filterText != null && !filterText.isBlank()) {
                    options = options == null ? null : options.filter(function (item) {
                        return item.text.toLowerCase().indexOf(filterText.toLowerCase()) != -1;
                    });
                }
                var _this = this;
                var value = this.getValueFromModel();
                return React.createElement(
                    'ul',
                    {
                        className: 'options',
                        onTouchStart: this.isMobilePhone() ? this.onOptionTouchStart : null,
                        onTouchMove: this.isMobilePhone() ? this.onOptionTouchMove : null,
                        onTouchEnd: this.isMobilePhone() ? this.onOptionTouchEnd : null
                    },
                    options.map(function (item, itemIndex) {
                        var css = {
                            chosen: value == item.id
                        };
                        return React.createElement(
                            'li',
                            {
                                onClick: _this.onOptionClick.bind(_this, item),
                                onMouseEnter: _this.onOptionMouseEnter,
                                onMouseLeave: _this.onOptionMouseLeave,
                                onMouseMove: _this.onOptionMouseMove,
                                className: $pt.LayoutHelper.classSet(css),
                                key: itemIndex,
                                'data-id': item.id
                            },
                            React.createElement(
                                'span',
                                null,
                                item.text
                            )
                        );
                    })
                );
            },
            renderNoOption: function (options) {
                if (options == null || options.length == 0) {
                    return React.createElement(
                        'div',
                        {className: 'no-option'},
                        React.createElement(
                            'span',
                            null,
                            NInputAndSelect.NO_OPTION_FOUND
                        )
                    );
                }
                return null;
            },
            renderFilterText: function (options, filterText) {
                if (options == null || options.length == 0) {
                    return;
                }
                if (this.hasFilterText()) {
                    var model = $pt.createModel({
                        text: filterText,
// on mobile phone, set as true to disable the soft keyboard
// set as false to enable it when popover render completed
// see #onPopoverRenderComplete
                        disabled: this.isMobilePhone() ? true : false
                    });
                    var layout = $pt.createCellLayout('text', {
                        comp: {
                            placeholder: NInputAndSelect.FILTER_PLACEHOLDER,
                            enabled: {
                                depends: 'disabled',
                                when: function (model) {
                                    return model.get('disabled') !== true;
                                }
                            }
                        },
                        evt: {
                            keyUp: this.onComponentKeyUp
                        }
                    });
                    model.addPostChangeListener('text', this.onFilterTextChange);
                    this.state.filterModel = model;
                    return React.createElement($pt.Components.NText, {model: model, layout: layout});
                } else {
                    return null;
                }
            },
            renderPopoverOperations: function () {
                if (!this.isMobilePhone()) {
                    return null;
                }
                return React.createElement(
                    'div',
                    {className: 'operations row'},
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'a',
                            {href: 'javascript:void(0);', onClick: this.hidePopover},
                            React.createElement(
                                'span',
                                null,
                                NInputAndSelect.CLOSE_TEXT
                            )
                        ),
                        React.createElement(
                            'a',
                            {href: 'javascript:void(0);', onClick: this.onClearClick},
                            React.createElement(
                                'span',
                                null,
                                NInputAndSelect.CLEAR_TEXT
                            )
                        )
                    )
                );
            },
            renderPopoverContent: function (filterText) {
                var options = this.getAvailableOptions();
                return React.createElement(
                    'div',
                    {className: this.hasFilterText() ? 'has-filter' : ''},
                    this.renderFilterText(options, filterText),
                    this.renderNoOption(options),
                    this.renderOptions(options, filterText),
                    this.renderPopoverOperations()
                );
            },
            getPopoverContainerCSS: function () {
                return 'n-select-popover';
            },
            beforeShowPopover: function () {
                if (this.state.popoverDiv) {
// log the last active option
                    var activeOption = this.state.popoverDiv.find('ul.options > li.active');
                    this.state.lastActiveOptionId = activeOption.attr('data-id');
                } else {
                    delete this.state.lastActiveOptionId;
                }
            },
            afterPopoverRenderComplete: function () {
// only recalculate when not mobile phone
                if (!this.isMobilePhone()) {
// if there is no active option, set first as active
                    var options = this.state.popoverDiv.find('ul.options > li');
                    if (options.length != 0) {
                        if (this.state.lastActiveOptionId) {
// according to react mechanism, must remove the existed active option first
// since active is not render by react by jquery, react will keep it
// active the last active option if exists
                            options.removeClass('active').filter(function (index, option) {
                                return $(option).attr('data-id') == this.state.lastActiveOptionId;
                            }.bind(this)).addClass('active');
                        }
                        if (this.state.popoverDiv.find('ul.options > li.active').length == 0) {
// active the first if no active option
                            this.state.popoverDiv.find('ul.options > li').first().addClass('active');
                        }
                    }
                }
                var filterText = this.state.popoverDiv.find('div.n-text input[type=text]');
                if (!filterText.is(':focus')) {
                    if (this.state.filteTextCaret != null) {
                        filterText.caret(this.state.filteTextCaret);
                    } else if (filterText.val() != null) {
                        filterText.caret(filterText.val().length);
                    }
                    if (!this.isMobilePhone()) {
                        filterText.focus();
                    } else {
// filterText.blur();
                    }
                }
// set as false anyway to let search text enabled
// actually only in mobile phone, it is set as true when renderring
// see #renderFilterText
                if (this.state.filterModel) {
                    this.state.filterModel.set('disabled', false);
                }
            },
            isOnLoadingWhenHasParent: function () {
                var codetable = this.getCodeTable();
                if (codetable == null || Array.isArray(codetable) || !codetable.isRemote()) {
                    return false;
                }
                var parentValue = this.getParentPropertyValue();
                if (parentValue == null) {
// no parent value
                    if (this.isAvailableWhenNoParentValue()) {
// still need options
// check code table is remote and not initialized
// is on loading
                        return codetable.isRemoteButNotInitialized();
                    } else {
// otherwise not need load options
                        codetable.setAsRemoteInitialized();
                        return false;
                    }
                } else {
// has parent value
// check code table segment is loaded or not
                    return !codetable.isSegmentLoaded(parentValue);
                }
            },
            isOnLoadingWhenNoParent: function () {
// var value = this.getValueFromModel();
                var codetable = this.getCodeTable();
// remote and not initialized
// is on loading
                return codetable != null && !Array.isArray(codetable) && codetable.isRemoteButNotInitialized();
            },
            onComponentClicked: function () {
                if (!this.isEnabled() || this.isViewMode()) {
// do nothing
                    return;
                }
                $(this.refs.code).focus();
//$(ReactDOM.findDOMNode(this.refs.label)).toggleClass('focus');
                if (!this.state.popoverDiv || !this.state.popoverDiv.is(':visible')) {
                    var codetable = this.getCodeTable();
                    if (this.hasParent() && this.isOnLoadingWhenHasParent()) {
                        this.setState({
                            onloading: true,
                            alreadySendRequest: true
                        }, function () {
                            codetable.loadRemoteCodeSegment(this.getParentPropertyValue()).done(function () {
                                this.showPopover();
                            }.bind(this)).always(function () {
                                this.setState({
                                    onloading: false,
                                    alreadySendRequest: false
                                });
                            }.bind(this));
                        }.bind(this));
                    } else if (this.isOnLoadingWhenNoParent()) {
                        this.setState({
                            onloading: true,
                            alreadySendRequest: true
                        }, function () {
                            codetable.initializeRemote().done(function () {
                                this.showPopover();
                            }.bind(this)).always(function () {
                                this.setState({
                                    onloading: false,
                                    alreadySendRequest: false
                                });
                            }.bind(this));
                        }.bind(this));
                    } else {
                        this.showPopover();
                    }
                }
            },
            onComponentKeyUp: function (evt) {
                if (evt.keyCode === 40) {
// down arrow
                    this.onComponentDownArrowKeyUp(evt);
                } else if (evt.keyCode === 38) {
// up arrow
                    this.onComponentUpArrowKeyUp(evt);
                } else if (evt.keyCode === 13) {
// enter
                    this.onComponentEnterKeyUp(evt);
                }
            },
            onComponentEnterKeyUp: function (evt) {
                evt.preventDefault();
                evt.stopPropagation();


                if (!this.isEnabled() || this.isViewMode()) {
// do nothing
                    return;
                }
                if (!this.state.popoverDiv || !this.state.popoverDiv.is(':visible')) {
                    return;
                }
                var option = this.state.popoverDiv.find('ul.options > li.active');
                if (option.length > 0) {
                    this.setValueToLabelText(option.attr('data-id'));
                    this.hidePopover();
//$(this.refs.label).blur();
                }
            },
            onComponentDownArrowKeyUp: function (evt) {
                evt.preventDefault();
                evt.stopPropagation();


                if (!this.isEnabled() || this.isViewMode()) {
// do nothing
                    return;
                }
                if (!this.state.popoverDiv || !this.state.popoverDiv.is(':visible')) {
                    this.onComponentClicked();
                } else {
                    var options = this.state.popoverDiv.find('ul.options > li');
                    var keystepOption = options.filter('.active');
                    if (keystepOption.length == 0) {
                        var first = options.first();
                        first.addClass('active');
                        this.scrollIntoView(first);
                    } else {
                        var last = options.last();
                        if (!keystepOption.first().is(last)) {
                            keystepOption.removeClass('active');
                            var next = keystepOption.next();
                            next.addClass('active');
                            this.scrollIntoView(next);
                        }
                    }
                }
            },
            onComponentUpArrowKeyUp: function (evt) {
                evt.preventDefault();
                evt.stopPropagation();


                if (!this.isEnabled() || this.isViewMode()) {
// do nothing
                    return;
                }
                if (!this.state.popoverDiv || !this.state.popoverDiv.is(':visible')) {
                    this.onComponentClicked();
                } else {
                    var options = this.state.popoverDiv.find('ul.options > li');
                    var keystepOption = options.filter('.active');
                    if (keystepOption.length == 0) {
                        var last = options.last();
                        last.addClass('active');
                        this.scrollIntoView(last);
                    } else {
                        var first = options.first();
                        if (!keystepOption.first().is(first)) {
                            keystepOption.removeClass('active');
                            var previous = keystepOption.prev();
                            previous.addClass('active');
                            this.scrollIntoView(previous);
                        }
                    }
                }
            },
            scrollIntoView: function (option) {
// for forbid the mouse event
                this.state.onKeyEventProcessed = true;


                var optionOffset = option.offset();
                var optionTop = optionOffset.top;
                var optionHeight = option.outerHeight();
                var optionBottom = optionTop + optionHeight;


                var parent = option.parent();
                var parentOffset = parent.offset();
                var parentTop = parentOffset.top;
                var parentBottom = parentTop + parent.height();
                var allOptions = parent.children();


                var win = $(window);
                var windowTop = win.scrollTop();
                var windowBottom = windowTop + win.height();


                if (optionTop < parentTop || optionBottom > parentBottom) {
// can not see option in its parent, scroll the parent
                    var optionIndex = allOptions.index(option);
                    var height = allOptions.toArray().reduce(function (prev, current, index) {
                        if (index < optionIndex) {
                            prev += $(current).outerHeight();
                        }
                        return prev;
                    }, 0);
                    parent.scrollTop(height);
                }
// get option offset again, since it might be changed
// but it is seen in its parent
                optionOffset = option.offset();
                optionTop = optionOffset.top;
                optionBottom = optionTop + optionHeight;
                if (optionBottom > windowBottom) {
                    win.scrollTop(windowTop + optionBottom - windowBottom);
                }
// get window scroll top again
                windowTop = win.scrollTop();
                if (optionTop < windowTop) {
// can not see option in window, even it is seen in its parent
// option is above the window top,
// which means parent top is less than window top, since option already been seen in parent
                    win.scrollTop(windowTop - (windowTop - optionTop));
                }
            },
            defaultOptionClick: function (item) {
                this.setValueToLabelText(item.id);
                this.hidePopover();
                $(this.refs.label).focus();
            },
            onOptionClick: function (item) {
                var customOptionClick = this.getComponentOption('optionClick');
                if (customOptionClick) {
                    var ret = customOptionClick.call(this, item);
                    if (ret && ret.done) {
// have return value, must be a jquery deferred
                        ret.done(function () {
                            this.defaultOptionClick(item);
                        }.bind(this));
                    } else {
                        this.defaultOptionClick(item);
                    }
                } else {
                    this.defaultOptionClick(item);
                }
            },
            onOptionMouseEnter: function (evt) {
            },
            onOptionMouseLeave: function (evt) {
// if (this.state.onKeyEventProcessed === true) {
// }
            },
            onOptionMouseMove: function (evt) {
// when handled the arrow up/down event, highlight the option
// in chrome, the mouse event will be triggered after call #scrollIntoView
// so use state onKeyEventProcessed to flag this operation
// if the flag is true, ignore the mouse event,
// and reset the flag, let the following mouse event processed
// cannot use mouse enter event, since there is no second enter event triggered
// must use mouse move event to handle, seems no performance issue here.
                if (this.state.onKeyEventProcessed === true) {
// console.log('onOptionMouseEnter #1', this.state.onKeyEventProcessed);
                    delete this.state.onKeyEventProcessed;
                } else {
// console.log('onOptionMouseEnter #2', this.state.onKeyEventProcessed);
                    $(evt.target).addClass('active').siblings().removeClass('active');
                }
            },
            onClearClick: function () {
                if (!this.isEnabled() || this.isViewMode()) {
                    return;
                }
                this.setValueToLabelText(NInputAndSelect.PLACEHOLDER);
//$(this.refs.label).blur();
// clear highlight
//if (this.state.popoverDiv) {
//this.state.popoverDiv.find('ul.options > li').filter('.chosen').removeClass('chosen');
//}
// for mobile
                this.hidePopover();
            },
            onFilterTextChange: function (evt) {
                if (this.state.popoverDiv.is(':visible')) {
                    var filterText = this.state.popoverDiv.find('div.n-text input[type=text]');
                    this.state.filteTextCaret = filterText.caret();
                } else {
                    this.state.filteTextCaret = null;
                }
// console.log('caret', this.state.filteTextCaret);
                if (this.isMobilePhone()) {
                    var optionContainer = this.state.popoverDiv.find('ul.options');
                    if (this.getOptionContainerOffsetY(optionContainer) !== 0) {
                        optionContainer.css({
                            'transform': '',
                            'transition-timing-function': '',
                            'transition-duration': ''
                        });
                    }
                }
                this.showPopover(evt.new);
            },
            getOptionTouchEventContainer: function (evt) {
                var target = $(evt.target);
                if (target[0].tagName != 'UL') {
                    target = target.closest('ul');
                }
                return target;
            },
            getOptionContainerOffsetY: function (container) {
                var transform = container.css('transform').split(',');
                if (transform.length > 5) {
                    return parseFloat(transform[5]);
                } else {
                    return 0;
                }
            },
            calcOptionContainerOffsetY: function (target, offsetY) {
                if (offsetY >= 0) {
                    offsetY = 0;
                } else {
                    var optionsHeight = target.height();
                    var totalHeight = target.parent().height();
                    if (optionsHeight <= totalHeight) {
                        return 0;
                    }
                    if (offsetY < totalHeight - optionsHeight) {
                        offsetY = totalHeight - optionsHeight;
                    }
                }
                return offsetY;
            },
            onOptionTouchStart: function (evt) {
                this.state.touchStartClientY = evt.touches[0].clientY;
                var target = this.getOptionTouchEventContainer(evt);
                this.state.touchStartRelatedY = this.getOptionContainerOffsetY(target);
                this.state.touchStartTime = moment();
            },
            onOptionTouchMove: function (evt) {
                var touches = evt.touches;
                var length = touches.length;
                if (length > 0) {
                    var target = this.getOptionTouchEventContainer(evt);
// calculate the distance of touch moving
// make sure the first and last option are in viewport
                    var distance = touches[length - 1].clientY - this.state.touchStartClientY;
                    var offsetY = this.calcOptionContainerOffsetY(target, this.state.touchStartRelatedY + distance);
                    target.css('transform', 'translateY(' + offsetY + 'px)');
                    this.state.touchLastClientY = touches[length - 1].clientY;
                }
            },
            onOptionTouchEnd: function (evt) {
// continue scrolling
// calculate the speed
                var timeUsed = moment().diff(this.state.touchStartTime, 'ms');
// alert(timeUsed);
                if (timeUsed <= 300) {
                    var distance = this.state.touchLastClientY - this.state.touchStartClientY;
                    var speed = distance / timeUsed * 10; // pixels per 10 ms
                    var target = this.getOptionTouchEventContainer(evt);
                    var startOffsetY = this.getOptionContainerOffsetY(target);
                    var targetOffsetY = this.calcOptionContainerOffsetY(target, startOffsetY + speed * 100 / 2);
                    target.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                        target.css({
                            'transition-timing-function': '',
                            'transition-duration': ''
                        });
                    });
                    target.css({
                        'transition-timing-function': 'cubic-bezier(0.1, 0.57, 0.1, 1)',
                        'transition-duration': '500ms',
                        'transform': 'translateY(' + targetOffsetY + 'px)'
                    });
                }


                delete this.state.touchStartClientY;
                delete this.state.touchStartRelatedY;
                delete this.state.touchStartTime;
            },
            /**
             * on parent model change
             * @param evt
             */
            onParentModelChanged: function (evt) {
                this.setValueToLabelText(null);
            },
            /**
             * get parent model
             * @returns {*}
             */
            getParentModel: function () {
                var parentModel = this.getComponentOption("parentModel");
                return parentModel == null ? this.getModel() : parentModel;
            },
            /**
             * get parent property value
             * @returns {*}
             */
            getParentPropertyValue: function () {
                return this.getParentModel().get(this.getParentPropertyId());
            },
            /**
             * get parent property id
             * @returns {string}
             */
            getParentPropertyId: function () {
                return this.getComponentOption("parentPropId");
            },
            /**
             * has parent or not
             * @returns {boolean}
             */
            hasParent: function () {
                return this.getParentPropertyId() != null;
            },
            hasFilterText: function () {
                var minimumResultsForSearch = this.getComponentOption('minimumResultsForSearch');
                return minimumResultsForSearch >= 0 && minimumResultsForSearch != Infinity;
            },
            /**
             * convert data options, options can be CodeTable object or an array
             * @param options
             * @returns {*}
             */
            convertDataOptions: function (options) {
                return Array.isArray(options) ? options : options.list();
            },
            getPlaceholder: function () {
                return this.getComponentOption('placeholder', NInputAndSelect.PLACEHOLDER);
            },
            isClearAllowed: function () {
                return this.getComponentOption('allowClear') && !this.isMobilePhone();
            },
            getCodeTable: function () {
                return this.getComponentOption('data');
            },
            /**
             * get available options.
             * if no parent assigned, return all data options
             * @returns {[*]}
             */
            getAvailableOptions: function () {
                if (!this.hasParent()) {
                    return this.convertDataOptions(this.getCodeTable());
                } else {
                    var parentValue = this.getParentPropertyValue();
                    if (parentValue == null) {
                        return this.isAvailableWhenNoParentValue() ? this.convertDataOptions(this.getCodeTable()) : [];
                    } else {
                        var filter = this.getComponentOption("parentFilter");
                        if (typeof filter === 'object') {
// call code table filter
                            return this.convertDataOptions(this.getCodeTable().filter($.extend({}, filter, {value: parentValue})));
                        } else {
// call local filter
                            var data = this.convertDataOptions(this.getCodeTable());
                            if (typeof filter === "function") {
                                return filter.call(this, parentValue, data);
                            } else {
                                return data.filter(function (item) {
                                    return item[filter] == parentValue;
                                });
                            }
                        }
                    }
                }
            },
            /**
             * is available when no parent value.
             * if no parent assigned, always return true.
             * @returns {boolean}
             */
            isAvailableWhenNoParentValue: function () {
// when has parent, return availableWhenNoParentValue
// or return true
                return this.hasParent() ? this.getComponentOption("availableWhenNoParentValue") : true;
            },
            getComponent: function () {
                return $(ReactDOM.findDOMNode(this.refs.comp));
            },
            render: function () {
                if (this.isViewMode()) {
                    return this.renderInViewMode();
                }
                var enabled = this.isEnabled();
                var css = {
                    'n-drop-text': true
                };
                if (!enabled) {
                    css['n-disabled'] = true;
                }
                var middleSpanStyle = {
                    width: '0'
                };
                return React.createElement(
                    'div',
                    {className: this.getComponentCSS($pt.LayoutHelper.classSet(css))},
                    React.createElement(
                        'div',
                        {className: 'input-group'},
                        React.createElement('input', {
                            type: 'text', className: 'form-control drop-code',
                            onChange: this.onComponentChange, ref: 'code',
                            disabled: !enabled, onFocus: this.onComponentFocused, onBlur: this.onComponentBlurred
                        }),
                        React.createElement('span', {
                            className: 'input-group-btn',
                            style: middleSpanStyle,
                            ref: 'comp'
                        }),
                        React.createElement('input', {
                            type: 'text', className: 'form-control drop-label', ref: 'label',
                            disabled: !enabled, readOnly: 'true', tabIndex: -1,
                            onFocus: this.onComponentFocused, onBlur: this.onComponentBlurred,
                            value: this.getCurrentDisplayText()
                        }),
                        React.createElement(
                            'span',
                            {className: 'input-group-addon advanced-drop-btn'},
                            React.createElement('span', {
                                className: 'fa fa-fw fa-close clear',
                                onClick: this.onClearClick
                            }),
                            React.createElement('span', {
                                className: 'fa fa-fw fa-sort-down drop', onClick: this.onComponentClicked,
                            })
                        ),
                        this.renderNormalLine(),
                        this.renderFocusLine()
                    )
                );
            },
            renderInViewMode: function () {
                var externalViewModeRenderer = $pt.LayoutHelper.getComponentViewModeRenderer(this.getLayout().getComponentType());
                if (externalViewModeRenderer) {
                    return externalViewModeRenderer.call(this, this.getModel(), this.getLayout(), this.props.direction, true);
                }


                var label = null;
                if (this.getTextInViewMode) {
                    label = this.getTextInViewMode();
                } else {
                    label = this.getValueFromModel();
                }
                var labelLayout = $pt.createCellLayout(this.getId(), $.extend(true, {}, {
                    comp: this.getComponentOption(),
// view css
                    css: this.getAdditionalCSS('view')
// pos, dataId, evt are all not necessary, since label will not use.
                }, {
                    label: label,
                    dataId: this.getDataId(),
                    comp: {
                        type: $pt.ComponentConstants.Label,
                        textFromModel: false
                    }
                }));
                var parameters = $pt.LayoutHelper.transformParameters(this.getModel(), labelLayout, this.props.direction, true);
                parameters.ref = 'viewLabel';
                return React.createElement($pt.Components.NLabel, parameters);
            },
            onComponentChange: function (evt) {
                console.log(evt.target.value);
                console.log("/////////")
                console.log(this.refs.label.value)
//var className =evt.target.className;
                var value = evt.target.value;
                var labelValue = this.refs.label.value;
                if (labelValue && labelValue != NInputAndSelect.PLACEHOLDER) {
                    this.setValueTextToModel(value + "," + this.refs.label.value);
                } else {
                    if (value) {
                        this.setValueTextToModel(value + ",");
                    } else {
                        this.setValueTextToModel(null);
                    }
                }
            },
            setValueTextToModel: function (value) {
                this.getModel().set(this.getDataId(), value);
            },
            setValueToLabelText: function (value) {
                this.refs.label.value = value;
                var codeValue = this.refs.code.value;
                if (codeValue) {
                    if (value && value != NInputAndSelect.PLACEHOLDER) {
                        this.setValueTextToModel(codeValue + "," + value);
                    } else {
                        this.setValueTextToModel(codeValue + ",");
                    }
                } else {
                    if (value && value != NInputAndSelect.PLACEHOLDER) {
                        this.setValueTextToModel("," + value);
                    } else {
                        this.setValueTextToModel(null);
                    }
                }
            },
            onLabelFocused: function () {
//this.getComponent().focus();
                $(ReactDOM.findDOMNode(this.refs.label)).toggleClass('focus');
            },
            onComponentFocused: function () {
                $(ReactDOM.findDOMNode(this.refs.focusLine)).toggleClass('focus');
                $(ReactDOM.findDOMNode(this.refs.normalLine)).toggleClass('focus');
            },
            onComponentBlurred: function () {
                $(ReactDOM.findDOMNode(this.refs.focusLine)).toggleClass('focus');
                $(ReactDOM.findDOMNode(this.refs.normalLine)).toggleClass('focus');
            },
            initSetValues: function () {
                var value = this.getValueFromModel();
                if (!this.isViewMode()) {
//this.getComponent().val(value);
                    if (value) {
                        var number = value.indexOf(",");
                        $(ReactDOM.findDOMNode(this.refs.code)).val(value.substring(0, number));
                        $(ReactDOM.findDOMNode(this.refs.label)).val(value.substring(number + 1));
                    }
                }
//var labelPropertyId = this.getComponentOption('labelPropId');
//if (labelPropertyId) {
// this.setLabelText(this.getModel().get(labelPropertyId));
//} else {
// // send ajax request
// this.retrieveAndSetLabelTextFromRemote(value);
//}
            },
        }));
        $pt.Components.NInputAndSelect = NInputAndSelect;
        $pt.LayoutHelper.registerComponentRenderer($pt.ComponentConstants.InputAndSelect, function (model, layout, direction, viewMode) {
            return React.createElement($pt.Components.NInputAndSelect, $pt.LayoutHelper.transformParameters(model, layout, direction, viewMode));
        });
    $pt.ComponentConstants.InputAndSelect ="inputAndSelect";
    })(window, jQuery, React, ReactDOM, $pt);






