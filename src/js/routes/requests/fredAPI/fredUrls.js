const fredRequestStrings = {
    getCategory : "https://api.stlouisfed.org/fred/category?category_id=${categoryID}",
    getChildCategory : "https://api.stlouisfed.org/fred/category/children?category_id=${childCategoryID}",
    getRelatedCategory : "https://api.stlouisfed.org/fred/category/related?category_id=${relatedCategoryID}",
    getCategorySeries : "https://api.stlouisfed.org/fred/category/series?category_id={seriesCategoryID}",
    getCategoryTag : "https://api.stlouisfed.org/fred/category/tags?category_id=${categoryTag}",
    //tag_names? quarterly?
    getRelatedTags : "https://api.stlouisfed.org/fred/category/related_tags?category_id=${relatedTag}&tag_names=services;quarterly",

    getReleases : "https://api.stlouisfed.org/fred/releases",
    getReleaseDates : "https://api.stlouisfed.org/fred/releases/dates",
    getReleaseSeries : "https://api.stlouisfed.org/fred/release/series?release_id=${releaseID}",
    getRelease : "https://api.stlouisfed.org/fred/release?release_id=${releaseID}",
    getReleaseDate : "https://api.stlouisfed.org/fred/release/dates?release_id=${releaseID}",
    getReleaseSource : "https://api.stlouisfed.org/fred/release/sources?release_id=${releaseID}",
    getReleaseTag : "https://api.stlouisfed.org/fred/release/tags?release_id=${releaseID}",
    //fix
    getReleaseRelatedTags : "https://api.stlouisfed.org/fred/release/related_tags?release_id=${releaseID}&tag_names=sa;foreign",
    getReleaseTable : "https://api.stlouisfed.org/fred/release/tables?release_id=${releaseID}&element_id=${elementID}",
    
    getSeries : "https://api.stlouisfed.org/fred/series?series_id=${seriesID}",
    getSeriesCategory : "https://api.stlouisfed.org/fred/series/categories?series_id=${seriesID}",
    getSeriesObservations : "https://api.stlouisfed.org/fred/series/observations?series_id=${seriesID}",
    getSeriesRelease : "https://api.stlouisfed.org/fred/series/release?series_id=${seriesID}",
    getSeriesUsingText : "https://api.stlouisfed.org/fred/series/search?search_text=${searchString}",
    getSeriesTagUsingText : "https://api.stlouisfed.org/fred/series/search/tags?series_search_text={searchString}",
    //fix
    getSeriesUsingRelatedTags : "https://api.stlouisfed.org/fred/series/search/related_tags?series_search_text=mortgage+rate&tag_names=30-year;frb&api_key=abcdefghijklmnopqrstuvwxyz123456",
    getSeriesTags : "https://api.stlouisfed.org/fred/series/tags?series_id=${seriesID}",
    getSeriesUpdates : "https://api.stlouisfed.org/fred/series/updates?",
    //not added
    getVintageDates : "https://api.stlouisfed.org/fred/series/vintagedates?series_id={seriesID}",

    //not added below
    getSources: "https://api.stlouisfed.org/fred/sources?",
    getSource : "https://api.stlouisfed.org/fred/source?source_id={sourceID}",
    getSourceRelease : "https://api.stlouisfed.org/fred/source?source_id={sourceID}",

    getTags : "https://api.stlouisfed.org/fred/tags?",
    //fix
    getTagsRelated : "https://api.stlouisfed.org/fred/related_tags?tag_names=monetary+aggregates;weekly",
    //fix 
    getTagMatch : "https://api.stlouisfed.org/fred/tags/series?tag_names=slovenia;food;oecd&api_key=abcdefghijklmnopqrstuvwxyz123456",
}

export default fredRequestStrings;