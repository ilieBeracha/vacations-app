import * as React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Modal } from '@mui/material';
import './DeleteVacation.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../../..';
import { VacationInterface } from '../../../../../models/VacationModel';
import { vacationService } from '../../../../../Services/vacationsService';


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

export default function DeleteVacation({vacation}:{vacation:VacationInterface}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteMutation = useMutation(
        (id: number) => vacationService.deleteVacation(id),
        {
            onSuccess: () => queryClient.refetchQueries(['vacations'])
        }
    )

    return (
        <div className='DeleteVacation'>
            <div onClick={() => setOpen(true)} className='deleteAndEditVacationBtn'>
                <DeleteIcon style={{color:'white'}} fontSize="small" />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure?
                    </Typography>
                    <div className='DeleteVacationBtns'>
                        <button onClick={() => deleteMutation.mutate(vacation.id)}>Delete</button>
                        <button onClick={()=> setOpen(false)}>Cancel</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}