import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class PrintComponent extends Component {

    static propTypes = {
        buttonClass: PropTypes.string,
        buttonText: PropTypes.string.isRequired
    }

    /** @var {{}} printContent */
    printContent

    state = {
        hidden: true
    }

    setPrintContentRef = (ref) => {
        this.printContent = ReactDOM.findDOMNode(ref)
    }

    onClick = () => {
        const printWindow = window.open()
        this.setState({hidden: false})
        if (printWindow) {
            printWindow.document.open()
            printWindow.document.write(this.printContent.innerHTML);
            printWindow.document.close()
            printWindow.focus()
            printWindow.print()
        }
        this.setState({hidden: true})
    }

    render = () =>
        <div>
            <button className={this.props.buttonClass} onClick={this.onClick}>{this.props.buttonText}</button>
            <div hidden={this.state.hidden} ref={this.setPrintContentRef}>
                {this.props.children}
            </div>
        </div>

}

export default PrintComponent