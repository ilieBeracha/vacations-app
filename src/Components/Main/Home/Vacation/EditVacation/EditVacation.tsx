import * as React from 'react';
import { Box } from '@mui/material';
import { Modal } from '@mui/material';
import { VacationInterface } from '../../../../../models/VacationModel';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../../..';
import { toastAlerts } from '../../../../../helpers/toastAlerts';
import { IMAGE_URL } from '../../../../../Services/config';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import './EditVacation.css'
import { vacationService } from '../../../../../Services/vacationsService';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function EditVacation({ vacation }: { vacation: VacationInterface }) {
    const [open, setOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm<VacationInterface>();
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setSelectedFile([])
    };

    const editMutation = useMutation(
        (vacation: any) => vacationService.editVacation(vacation),
        {
            onSuccess: () => queryClient.refetchQueries(['vacations'])
        }
    )

    async function editVacationForm(vacationEditData: VacationInterface) {
        try {
            const editVacation: any = new FormData();
            editVacation.append('id', vacation.id);
            editVacation.append('destination', vacationEditData.destination);
            editVacation.append('description', vacationEditData.description);
            editVacation.append('startingDate', vacationEditData.startingDate)
            editVacation.append('endingDate', vacationEditData.endingDate)
            editVacation.append('price', vacationEditData.price.toString())
            editVacation.append('imageName', selectedFile ? selectedFile[0] : '')
            editMutation.mutate(editVacation);
            toastAlerts.toastSuccess('Edited')
            setOpen(false)
            setSelectedFile([])
        } catch (e) {
            toastAlerts.toastError('Error editing')
        }

    } const handleFiles = (fileItems: any) => {
        const files = fileItems.map((fileItem: any) => fileItem.file);
        setSelectedFile(files);
    };

    return (
        <div className='EditVacation'>
            <div onClick={() => setOpen(true)} className='deleteAndEditVacationBtn'>
                <EditIcon style={{ color: 'white' }} fontSize="small" />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='VacationForm editForm'>
                        <form action="" onSubmit={handleSubmit(editVacationForm)}>
                            <div className='editFormDetails'>

                                <label htmlFor="">Destination: </label>
                                <input defaultValue={vacation.destination} type="text" {...register('destination', {
                                    required: true
                                })} />
                                <label htmlFor="">Description: </label>
                                <textarea id='vacationDescription' defaultValue={vacation.description} {...register('description', {
                                    maxLength: 250,
                                    required: true
                                })}></textarea>
                                <label htmlFor="">Start on: </label>
                                <input defaultValue={vacation.startingDate} type="date" {...register('startingDate', {
                                    required: true
                                })} />
                                <label htmlFor="">End on: </label>
                                <input defaultValue={vacation.endingDate} type="date" {...register('endingDate', {
                                    required: true
                                })} />
                                <label htmlFor="">Price: </label>
                                <input defaultValue={vacation.price} type="number" {...register('price', {
                                    minLength: 0,
                                    maxLength: 1000,
                                    required: true
                                })} />
                            </div>

                            <div className='editFormImages'>

                                <label htmlFor="">Previous image</label>
                                <div className='prevImageDisplayDiv'>
                                    <img src={IMAGE_URL + vacation.imageName} alt="" />

                                </div>
                                <label htmlFor="">Choose new image (optional)</label>
                                <FilePond

                                    files={selectedFile}
                                    onupdatefiles={handleFiles}
                                    allowMultiple={false}
                                    maxFiles={1}
                                    name="files"
                                    labelIdle='Select Image'
                                    server={null}
                                />
                                {/* <input type="file" onChange={(e: any) => setSelectedFile(e.target.files[0])} /> */}
                                {errors.description ? <div className="useFormError"><span>Description max length 250</span></div> : <></>}
                                <div className='formVacationBtns'>
                                    <button type='submit'>Update Vacation</button>
                                    <button onClick={() => setOpen(false)} type='button'>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}