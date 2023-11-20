import { Buffer } from 'buffer';

function MstInventoryPicture(blob) {
    if (blob.blob === null || blob.blob.data.length === 0) return <></>

    const img = Buffer.from(blob.blob, 'base64').toString();
    return (
        <>
            <img src={img} width="100" height="100" />
        </>
    );
}

export default MstInventoryPicture;