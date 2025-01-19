import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCamps = () => {
    const axiosPublicly = useAxiosPublic();
    const { data: allCamps, refetch, isPending: loading } = useQuery({
        queryKey: ["allCamps"],

        queryFn: async () => {
            const result = await axiosPublicly.get("/camps");
            return result.data
        }
    })

    return (
        [allCamps, refetch, loading]
    );
};

export default useCamps;