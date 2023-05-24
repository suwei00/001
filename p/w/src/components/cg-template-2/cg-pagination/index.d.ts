declare namespace CgPagination{
    interface Props {
        total: number,
        onPageChange: (page: number) => void,
        currentPage: number,
        [key]: any
    }
}

declare const CgPagination: import('vue').DefineComponent<CgPagination.Props>;

export default CgPagination;