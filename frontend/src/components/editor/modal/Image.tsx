import { useState, ChangeEvent } from 'react';

import Modal from '@components/modal/Modal';
import ModalContent from '@components/modal/Content';
import ModalButton from '@components/modal/Button';

import ImageForm from '@components/form/ImageForm';

interface Props {
    isOpen: boolean;
    close: Function;
    onUpload: Function;
}

let image: File | undefined;

export default function TempArticleModal(props: Props) {
    const [ imagePath, setImagePath ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');

    return (
        <Modal title='이미지 업로드' isOpen={props.isOpen} close={() => props.close()}>
            <ModalContent>
                <ImageForm
                    title="이미지 선택"
                    name="image"
                    imageName={imagePath}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const { files } = e.target;

                        if(files) {
                            image = files[0];

                            const reader = new FileReader();

                            reader.onload = (e) => {
                                setImagePreview(e.target?.result as string);
                            }

                            setImagePath(image.name);
                            reader.readAsDataURL(image);
                        }
                    }}
                />
                <img src={imagePreview} className="w-100"/>
            </ModalContent>
            <ModalButton text="등록" onClick={() => {
                props.onUpload(image);
                props.close();

                setImagePath('');
                setImagePreview('');
                image = undefined;
            }}/>
        </Modal>
    );
}