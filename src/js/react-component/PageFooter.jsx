/**
 * page footer.<br>
 */
(function (window, $, React, ReactDOM, $pt) {
	var NPageFooter = React.createClass({
		displayName: 'NPageFooter',
		statics: {
			TECH_BASE: '河南农业大学',
			TECH_URL: 'http://www.henau.edu.cn/',
			COMPANY: '',
			COMPANY_URL: '',
			LEFT_TEXT: ''
		},
		getDefaultProps: function () {
			return {};
		},
		renderTech: function () {
			if (NPageFooter.TECH_BASE != null && !NPageFooter.TECH_BASE.isBlank()) {
				return (
					<span><a href={NPageFooter.TECH_URL} target='_blank' tabIndex='-1'>{NPageFooter.TECH_BASE}</a></span>);
			}
			return null;
		},
		renderCompany: function () {
			if (NPageFooter.COMPANY != null && !NPageFooter.COMPANY.isBlank()) {
				return (
					<span>, by <a href={NPageFooter.COMPANY_URL} target="_blank" tabIndex='-1'>{NPageFooter.COMPANY}</a></span>);
			}
			return null;
		},
		render: function () {
			return (
				<footer className="footer">
					<div className="container">
						<p className='text-muted' style={{display: 'inline-block'}}>
							<span>{NPageFooter.LEFT_TEXT}</span>
						</p>

						<p className="text-muted pull-right" style={{display: 'inline-block'}}>
							{this.props.name}
							{this.renderTech()}
							{this.renderCompany()}.
						</p>
					</div>
				</footer>);
		}
	});
	$pt.Components.NPageFooter = NPageFooter;
}(window, jQuery, React, ReactDOM, $pt));
