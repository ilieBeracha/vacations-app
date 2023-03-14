import { useQuery } from "@tanstack/react-query"
import { vacationService } from "../Services/vacationsService"

export const LikesForGraph = () =>{
    const likesForGraph = useQuery({
        queryKey:['likesForGraphs'],
        queryFn:()=> vacationService.getLikesForGraph(),
    })
    return likesForGraph
}