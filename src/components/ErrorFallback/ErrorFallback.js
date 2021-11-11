import Button from "../Button/Button";
import "./ErrorFallback.css"

function ErrorFallback({error, resetErrorBoundary}) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <Button buttonType="colored" action={resetErrorBoundary}>Try again</Button>
        </div>
    )
}

export default ErrorFallback;