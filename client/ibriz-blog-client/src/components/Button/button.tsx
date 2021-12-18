
interface ButtonProps {
    label: string,
    Icon?: any,
    color?: any,
    borderColor?: any,
    bgColor?: any,
    disabled? : boolean,
    handleClick? : any
}



const Button = ({
    label, 
    Icon,
    color = "white",
    bgColor = "#024869",
    borderColor = "#024869",
    disabled = false, 
    handleClick,


}: ButtonProps) => {
    return (
        <button 
        className = "d-flex btn"
        style = {{
            color: color,
            backgroundColor: bgColor,
            borderColor: borderColor,
            alignItems: "center",
            alignContent: "center",
            fontSize: "18px",
            textDecoration: "none"
        }}
        disabled = {disabled}
        onClick={()=> handleClick? handleClick: ()=>{}}
        >
            {Icon ? Icon : <span></span>}
            <span>{label}</span>

        </button>
    )
}

export default Button;