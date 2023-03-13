const getPredicateTimeStamp = (date) => {
    return new Date((Date.parse(date) + 7 * 24 * 60 * 60 * 1000)).toISOString();
}

export { getPredicateTimeStamp }