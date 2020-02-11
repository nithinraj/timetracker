export function doFetch(url, actionType, dispatch, options) {
    console.log('fetch --> ', url)

    if (options && 'POST' == options.method) {
        fetch(url, options)

    } else {
        fetch(url)
            .then(res => res.json())
            .then(data => dispatch(
                {
                    type: actionType,
                    data: data
                })
            )
    }

}

export let months = [, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export let constants = {
    recordIn: 'In',
    recordOut: 'Out'
}