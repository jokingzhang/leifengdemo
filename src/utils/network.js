/*
  args[0]
 */
export function fetch (url, params) {
    return (dispatch) => {


        return fetch(apiUrl).then((response) => {
          if (response.status !== 200) {
            throw new Error('Fail to get response with status ' + response.status);
          }

          response.json().then((responseJson) => {
            dispatch(fetchWeatherSuccess(responseJson.weatherinfo));
          }).catch((error) => {
            dispatch(fetchWeatherFailure(error));
          });
        }).catch((error) => {
          dispatch(fetchWeatherFailure(error));
        })


        return fetch(url).then(response => {
          if (response.ok) {
            response.json().then(data => {
                console.info('fetch=>', data.articles);

                this.setState({ articles: data.articles });
            });
          } else {
            response.json().then(error => {
              alert(`Failed to fetch articles ${error.message}`);
            });
          }
        }).catch(err => {
          alert(`Error in fetching data from server: ${err}`);
        });
    }
}
