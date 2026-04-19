export default function Spinner(){
    return(
        <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '4px solid #e0e0e0',
            borderTop: '4px solid #4f46e5',
            animation: 'spin 1s linear infinite',
            }}>
        </div>
    )
}