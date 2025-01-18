import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCamps = () => {
    const axiosSecurely = useAxiosSecure();
    const { data: allCamps, refetch, isPending: loading } = useQuery({
        queryKey: ["allCamps"],

        queryFn: async () => {
            const result = await axiosSecurely.get("/camps");
            return result.data
        }
    })

    return (
        [allCamps, refetch, loading]
    );
};

export default useCamps;