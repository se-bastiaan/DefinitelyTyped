import MapiClient, { SdkConfig } from '@mapbox/mapbox-sdk/lib/classes/mapi-client';
import { MapiRequest } from '@mapbox/mapbox-sdk/lib/classes/mapi-request';
import { MapiResponse } from '@mapbox/mapbox-sdk/lib/classes/mapi-response';
import Directions, { DirectionsService, DirectionsResponse } from '@mapbox/mapbox-sdk/services/directions';
import Styles, { StylesService } from '@mapbox/mapbox-sdk/services/styles';

const config: SdkConfig = {
    accessToken: 'access-token',
};
const client = new MapiClient(config);

const directionsService: DirectionsService = Directions(client);

const mapiRequest: MapiRequest = directionsService.getDirections({
    profile: 'walking',
    waypoints: [
        {
            coordinates: [1, 3],
        },
        {
            coordinates: [2, 4],
        },
    ],
});

mapiRequest.send().then((response: MapiResponse) => {
    const body = response.body as DirectionsResponse;
    const route = body.routes;
});

const stylesService: StylesService = Styles(config);
stylesService.putStyleIcon({
    styleId: 'style-id',
    iconId: 'icon-id',
    file: 'path-to-file.file'
});
