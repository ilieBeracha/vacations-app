import { useQuery } from "@tanstack/react-query";
import { vacationService } from "../Services/vacationsService";

export const useVacationsQuery = (offset: number, likes = false, active = false, coming = false) => {
    const { data, isLoading, isSuccess, isError, isPreviousData } = useQuery({
        queryKey: ['vacations', offset, likes, active, coming],
        queryFn: async () => await vacationService.getVacations(offset, likes, active, coming),
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true
    });
    return { data, isLoading, isSuccess, isError, isPreviousData }
}

export const useSumOfVacationsQuery = (liked = false, active = false, coming = false) => {
    const sumOfVacations: any = useQuery({
        queryKey: ['sumOfVacations', liked, active, coming],
        queryFn: () => vacationService.getSumOfVacations(liked, active, coming),
    });
    return sumOfVacations
}