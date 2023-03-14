import { useMutation } from "@tanstack/react-query";
import { queryClient } from "..";
import { VacationInterface } from "../models/VacationModel";
import { vacationService } from "../Services/vacationsService";

export function useLikesMutation(vacation: VacationInterface, offset: number) {
    const mutate = useMutation(
        () => vacationService.addOrRemoveLike(vacation.id),
        {
            onSuccess: async () => {
                queryClient.refetchQueries(['vacations', offset]);
            }
        }
    )
    return mutate;
}