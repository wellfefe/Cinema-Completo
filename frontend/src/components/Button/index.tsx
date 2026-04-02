
//prpriedades do botão
interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    label: string;
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    onClick?: () => void;
}

export const Button = (
    { type = 'button', label, variant = 'primary', onClick }: ButtonProps
) => {
    return (
        <>   
        <button className={"btn btn-" + variant} type={type} onClick={onClick} >
        {label}
        </button>
        </>
    );
}