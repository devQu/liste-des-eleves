import { connect } from "react-redux"
import { check } from "../../../store/actions/eleves"
import { useState } from "react"

const Checkbox = (props) => {

    const [check, setCheck] = useState(props.accepted)
    const onCheck = () => setCheck(curr => !curr)

    const onChange = () => {
        onCheck()
        props.check(props.index)
    }

    return (
        <input type="checkbox" checked={check} onChange={onChange} />
    )
}

function mapDispatchToProps(dispatch) {
    return { check: id => dispatch(check(id)) }
}

export default connect(null, mapDispatchToProps)(Checkbox)