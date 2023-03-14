import * as React from 'react';
import { Box, LinearProgress } from '@mui/material';
import { Typography } from '@mui/material';
import { Modal } from '@mui/material';
import './AddVacation.css'
import { useForm } from 'react-hook-form';
import { VacationInterface } from '../../../../../models/VacationModel';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../../..';
import { toastAlerts } from '../../../../../helpers/toastAlerts';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { vacationService } from '../../../../../Services/vacationsService';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function AddVacation() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<VacationInterface>();
    const [selectedFile, setSelectedFile] = useState([])
    const handleClose = () => {
        setOpen(false);
        setSelectedFile([])
    }

    const vacationsMutate = useMutation(
        (vacation: FormData) => vacationService.addVacation(vacation),
        {
            onSuccess: () => queryClient.refetchQueries(['vacations'])
        }
    )

    async function addVacation(vacation: VacationInterface) {
        if (vacation.endingDate < vacation.startingDate) {
            toastAlerts.toastError('Ending date cannot be sooner than starting date');
            return;
        }

        try {
            const newVacation = new FormData();
            newVacation.append('destination', vacation.destination);
            newVacation.append('description', vacation.description);
            newVacation.append('startingDate', vacation.startingDate)
            newVacation.append('endingDate', vacation.endingDate)
            newVacation.append('price', vacation.price.toString())
            newVacation.append('imageName', selectedFile ? selectedFile[0] : '')
            vacationsMutate.mutate(newVacation);
            toastAlerts.toastSuccess('Vacation added')
            reset()
            setOpen(false)
            setSelectedFile([])
        } catch (e) {
            toastAlerts.toastError('Error')
        }
    }

    const handleFiles = (fileItems: any) => {
        const files = fileItems.map((fileItem: any) => fileItem.file);
        setSelectedFile(files);
    };

    return (
        <div className='AddVacation'>
            <div onClick={() => setOpen(true)} className="addVacationDiv">
                <button >Add vacation</button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='VacationForm'>
                        <form action="" onSubmit={handleSubmit(addVacation)}>
                            <label htmlFor="">Destination: </label>
                            <input type="text" {...register('destination', {
                                required: true
                            })} />
                            <label htmlFor="">Description: </label>
                            <textarea {...register('description', {
                                maxLength: 250,
                                required: true
                            })}></textarea>
                            <label htmlFor="">Start on: </label>
                            <input min={new Date().toISOString().split("T")[0]} type="date" {...register('startingDate', {
                                required: true
                            })} />
                            <label htmlFor="">End on: </label>
                            <input type="date" {...register('endingDate', {
                                required: true
                            })} />
                            <label htmlFor="">Price: </label>
                            <input placeholder='$' type="number" min={0} max={10000} {...register('price', {
                                minLength: 0,
                                maxLength: 1000,
                                required: true
                            })} />
                            <label htmlFor="">Cover image</label>
                            {/* <input required={true} type="file" onChange={(e: any) => setSelectedFile(e.target.files[0])} /> */}
                            <FilePond
                                required
                                files={selectedFile}
                                onupdatefiles={handleFiles}
                                allowMultiple={false}
                                maxFiles={1}
                                name="files"
                                labelIdle='Select Image'
                                server={null}
                            />
                            {errors.description ? <div className="useFormError"><span>Description max length 250</span></div> : <></>}
                            <div className='formVacationBtns'>
                                <button type='submit'>Add Vacation</button>
                                <button onClick={() => setOpen(false)} type='button'>Cancel</button>
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}