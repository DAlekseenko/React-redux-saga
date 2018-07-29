import React, {Component} from 'react';
import FormGroup from "../Partials/FormGroup"

export default class Teaser extends Component {

    render() {
        const {Text, Params, SuggestedSum, ValidSum} = this.props.teaser;

        const infoBlock = ValidSum ?
            SuggestedSum.reverse().map((value, i) => {
                value = value.toFixed(2)
                return <FormGroup key={i}
                                  name='sum'
                                  type='radio'
                                  label={value}
                                  value={value}
                                  checked={this.props.sum === value}
                                  onChange={this.props.onChange}/>
            }) :
            <b>{`${Params.get('sum')} ${Params.get('currency')}`}</b>

        return <div className="teaser">{Text}{infoBlock}</div>
    }
}

