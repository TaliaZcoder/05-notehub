const [page, setPage] = useState(1);
const [search, setSearch] = useState("");
const [isModalOpen, setIsModalOpen] = useState(false);

const debouncedSearch = useDebouncedCallback((value: string) => {
  setSearch(value);
  setPage(1);
}, 500);

const { data, isLoading, isError } = useQuery({
  queryKey: ["notes", page, search],
  queryFn: () => fetchNotes(page, search),
});

const notes = data?.notes ?? [];
const totalPages = data?.totalPages ?? 0;