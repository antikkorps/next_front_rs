interface Props {
    message?: string,
}

function SingleErrorMessage(props: Props) {
    const { message } = props;

    return (
        <p className=' text-red-600 text-sm font-clashLight italic'>
            {message}
        </p>
    )
}

export default SingleErrorMessage