const items = Array.from({length: 100}).map((_, i) => ({
    id: i,
    name: `아이템 ${i}`
}));


const LIMIT = 10;

export function fetchItems({pageParam}) {
    return Promise.resolve({
        data: items.slice(pageParam, pageParam + LIMIT),
        currentPage: pageParam,
        nextPage: pageParam + LIMIT < items.length ? pageParam + LIMIT : null,
    })
}
