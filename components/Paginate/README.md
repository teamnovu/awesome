Paginate
=================

This renderless component is used to easily integrate pagination logic.

## Usage

```html
<Paginate endpoint="/events">
  <div slot-scope="{ items, loadMore, hasMore, state, error }">
    <div v-for="item in items" :key="item.id">
      <!-- Render your items -->
    </div>

    <div v-if="state === 'loading'">
      Loading...
    </div>
    <div v-else-if="state === 'error'">
      Error: {{ error.message }}
    </div>
    <button v-else-if="hasMore" @click="loadMore">
      Load More
    </button>
  </div>
</Paginate>
```

## Props

| Prop           	| Type     	| Default                                                                        	| Description                                                                                                                                                           	|
|----------------	|----------	|--------------------------------------------------------------------------------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| endpoint       	| String   	| none, required                                                                 	| Paginated endpoint to call to fetch items                                                                                                                             	|
| limit          	| Number   	| 10                                                                             	| Maximum amount of items to load per page                                                                                                                              	|
| pageQueryKey   	| String   	| 'page'                                                                         	| URL query key to use for the page                                                                                                                                     	|
| limitQueryKey  	| String   	| 'limit'                                                                        	| URL query key to use for the limit                                                                                                                                    	|
| firstPageItems 	| Array    	| []                                                                             	| Preloaded items (eg. server side rendered). Setting this will prevent the component from fetching the first page on mounted and the first fetch will start at page 2. 	|
| parseItems     	| Function 	| data => data.data                                                              	| Function used to parse items-array from the response body                                                                                                             	|
| parseMeta      	| Function 	| data => ({currentPage: data.meta.current_page, lastPage: data.meta.last_page}) 	| Function used to parse meta-object from the response body. Expected return object contains these properties: `currentPage`, `lastPage`                                	|

## Slot Scope

| Property 	| Type     	| Description                                                  	|
|----------	|----------	|--------------------------------------------------------------	|
| items    	| Array    	| Array containing the items to display                        	|
| meta    	| Object   	| Object containing meta information about the paginator       	|
| hasMore  	| Boolean  	| Wether or not there are more items to be loaded              	|
| loadMore 	| Function 	| Function used to load more items                             	|
| state    	| String   	| The current state of the paginator (loading, success, error) 	|
| error    	| Error    	| The error that caused the state to be `error`                	|
