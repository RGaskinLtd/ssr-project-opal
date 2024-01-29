import { Loader } from '@googlemaps/js-api-loader'

const loader = new Loader({
  apiKey: 'AIzaSyDTQaJaUCJZqlqD0KZIsNWY2Y7qkg9iyHs'
})

const mapOptions = {
  center: { lat: 40, lng: 70 },
  zoom: 3,
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  styles: [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5'
        }
      ]
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161'
        }
      ]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5'
        }
      ]
    },
    {
      featureType: 'administrative.country',
      elementType: 'geometry.stroke',
      stylers: [
        {
          visibility: 'on'
        },
        {
          color: '#A0A0A0'
        }
      ]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff'
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161'
        }
      ]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e'
        }
      ]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5'
        }
      ]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#9e9e9e'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e'
        }
      ]
    }
  ]
}

export async function createMap (mapId: string) {
  if (!mapId) { return }
  const el = document.getElementById(mapId)
  if (!el) { return }
  const google = await loader.load()
  if (!google) { return }
  const map = new google.maps.Map(el, mapOptions)
  return { google, map }
}

export interface CountryInfo {
  code: string;
  latitude: number;
  longitude: number;
  name: string;
}

// Retrieved from google maps api
export const Countries = [
  {
    name: 'Anguilla',
    code: 'AI',
    longitude: -63.06861499999999,
    latitude: 18.220554
  },
  {
    name: 'Afghanistan',
    code: 'AF',
    longitude: 67.709953,
    latitude: 33.93911
  },
  {
    name: 'Antigua and Barbuda',
    code: 'AG',
    longitude: -61.796428,
    latitude: 17.060816
  },
  {
    name: 'Andorra',
    code: 'AD',
    longitude: 1.521801,
    latitude: 42.506285
  },
  {
    name: 'Bermuda',
    code: 'BM',
    longitude: -64.7505,
    latitude: 32.3078
  },
  {
    name: 'Belgium',
    code: 'BE',
    longitude: 4.469936,
    latitude: 50.503887
  },
  {
    name: 'Bahrain',
    code: 'BH',
    longitude: 50.5577,
    latitude: 26.0667
  },
  {
    name: 'Australia',
    code: 'AU',
    longitude: 133.775136,
    latitude: -25.274398
  },
  {
    name: 'Barbados',
    code: 'BB',
    longitude: -59.543198,
    latitude: 13.193887
  },
  {
    name: 'Bangladesh',
    code: 'BD',
    longitude: 90.356331,
    latitude: 23.684994
  },
  {
    name: 'Angola',
    code: 'AO',
    longitude: 17.873887,
    latitude: -11.202692
  },
  {
    name: 'Antarctica',
    code: 'Antarctica',
    longitude: 135,
    latitude: -82.86275189999999
  },
  {
    name: 'Armenia',
    code: 'AM',
    longitude: 45.038189,
    latitude: 40.069099
  },
  {
    name: 'Netherlands Antilles',
    code: 'Netherlands Antilles',
    longitude: -68.26238219999999,
    latitude: 12.2018902
  },
  {
    name: 'Benin',
    code: 'BJ',
    longitude: 2.315834,
    latitude: 9.30769
  },
  {
    name: 'Burkina Faso',
    code: 'BF',
    longitude: -1.561593,
    latitude: 12.238333
  },
  {
    name: 'Austria',
    code: 'AT',
    longitude: 14.550072,
    latitude: 47.516231
  },
  {
    name: 'Brazil',
    code: 'BR',
    longitude: -51.92528,
    latitude: -14.235004
  },
  {
    name: 'Argentina',
    code: 'AR',
    longitude: -63.61667199999999,
    latitude: -38.416097
  },
  {
    name: 'Bosnia and Herzegovina',
    code: 'BA',
    longitude: 17.679076,
    latitude: 43.915886
  },
  {
    name: 'Albania',
    code: 'AL',
    longitude: 20.168331,
    latitude: 41.153332
  },
  {
    name: 'Aruba',
    code: 'AW',
    longitude: -69.968338,
    latitude: 12.52111
  },
  {
    name: 'Azerbaijan',
    code: 'AZ',
    longitude: 47.576927,
    latitude: 40.143105
  },
  {
    name: 'Bolivia',
    code: 'BO',
    longitude: -63.58865299999999,
    latitude: -16.290154
  },
  {
    name: 'Bulgaria',
    code: 'BG',
    longitude: 25.48583,
    latitude: 42.733883
  },
  {
    name: 'Brunei',
    code: 'BN',
    longitude: 114.727669,
    latitude: 4.535277
  },
  {
    name: 'American Samoa',
    code: 'AS',
    longitude: -170.132217,
    latitude: -14.270972
  },
  {
    name: 'Burundi',
    code: 'BI',
    longitude: 29.918886,
    latitude: -3.373056
  },
  {
    name: 'Estonia',
    code: 'EE',
    longitude: 25.013607,
    latitude: 58.595272
  },
  {
    name: 'Eritrea',
    code: 'ER',
    longitude: 39.782334,
    latitude: 15.179384
  },
  {
    name: 'Christmas Island',
    code: 'CX',
    longitude: 105.690449,
    latitude: -10.447525
  },
  {
    name: 'Cyprus',
    code: 'CY',
    longitude: 33.429859,
    latitude: 35.126413
  },
  {
    name: 'Falkland Islands',
    code: 'FK',
    longitude: -59.523613,
    latitude: -51.796253
  },
  {
    name: 'Bouvet Island',
    code: 'Bouvet Island',
    longitude: 3.3464497,
    latitude: -54.4207915
  },
  {
    name: 'Belize',
    code: 'BZ',
    longitude: -88.49765,
    latitude: 17.189877
  },
  {
    name: 'Fiji',
    code: 'FJ',
    longitude: 178.065032,
    latitude: -17.713371
  },
  {
    name: 'Libya',
    code: 'LY',
    longitude: 17.228331,
    latitude: 26.3351
  },
  {
    name: 'Morocco',
    code: 'MA',
    longitude: -7.092619999999999,
    latitude: 31.791702
  },
  {
    name: 'Lesotho',
    code: 'LS',
    longitude: 28.233608,
    latitude: -29.609988
  },
  {
    name: 'Costa Rica',
    code: 'CR',
    longitude: -83.753428,
    latitude: 9.748916999999999
  },
  {
    name: 'Guatemala',
    code: 'GT',
    longitude: -90.23075899999999,
    latitude: 15.783471
  },
  {
    name: 'Equatorial Guinea',
    code: 'GQ',
    longitude: 10.267895,
    latitude: 1.650801
  },
  {
    name: 'Monaco',
    code: 'MC',
    longitude: 7.424615799999999,
    latitude: 43.73841760000001
  },
  {
    name: 'Marshall Islands',
    code: 'MH',
    longitude: 171.184478,
    latitude: 7.131474
  },
  {
    name: 'Moldova',
    code: 'MD',
    longitude: 28.369885,
    latitude: 47.411631
  },
  {
    name: 'Montenegro',
    code: 'ME',
    longitude: 19.37439,
    latitude: 42.708678
  },
  {
    name: 'Gabon',
    code: 'GA',
    longitude: 11.609444,
    latitude: -0.803689
  },
  {
    name: 'Macedonia',
    code: 'MK',
    longitude: 21.745275,
    latitude: 41.608635
  },
  {
    name: 'Mali',
    code: 'ML',
    longitude: -3.996166,
    latitude: 17.570692
  },
  {
    name: 'Myanmar',
    code: 'MM',
    longitude: 95.955974,
    latitude: 21.916221
  },
  {
    name: 'Chile',
    code: 'CL',
    longitude: -71.542969,
    latitude: -35.675147
  },
  {
    name: 'Micronesia',
    code: 'FM',
    longitude: 150.550812,
    latitude: 7.425554
  },
  {
    name: 'Bahamas',
    code: 'BS',
    longitude: -77.39627999999999,
    latitude: 25.03428
  },
  {
    name: 'Dominica',
    code: 'DM',
    longitude: -61.37097600000001,
    latitude: 15.414999
  },
  {
    name: 'Czech Republic',
    code: 'CZ',
    longitude: 15.472962,
    latitude: 49.81749199999999
  },
  {
    name: 'Democratic Republic of the Congo',
    code: 'CD',
    longitude: 21.758664,
    latitude: -4.038333
  },
  {
    name: 'Western Sahara',
    code: 'EH',
    longitude: -12.885834,
    latitude: 24.215527
  },
  {
    name: 'British Indian Ocean Territory',
    code: 'IO',
    longitude: 71.876519,
    latitude: -6.343194
  },
  {
    name: 'China',
    code: 'CN',
    longitude: 104.195397,
    latitude: 35.86166
  },
  {
    name: 'Cook Islands',
    code: 'CK',
    longitude: -159.777671,
    latitude: -21.236736
  },
  {
    name: 'Grenada',
    code: 'GD',
    longitude: -61.67899999999999,
    latitude: 12.1165
  },
  {
    name: 'Faroe Islands',
    code: 'FO',
    longitude: -6.911805999999999,
    latitude: 61.89263500000001
  },
  {
    name: 'Ethiopia',
    code: 'ET',
    longitude: 40.489673,
    latitude: 9.145000000000001
  },
  {
    name: 'Hungary',
    code: 'HU',
    longitude: 19.503304,
    latitude: 47.162494
  },
  {
    name: 'Djibouti',
    code: 'DJ',
    longitude: 42.590275,
    latitude: 11.825138
  },
  {
    name: 'Cameroon',
    code: 'CM',
    longitude: 12.354722,
    latitude: 7.369721999999999
  },
  {
    name: 'Cape Verde',
    code: 'CV',
    longitude: -23.0418,
    latitude: 16.5388
  },
  {
    name: 'Guyana',
    code: 'GY',
    longitude: -58.93018,
    latitude: 4.860416
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    longitude: -3.435973,
    latitude: 55.378051
  },
  {
    name: 'Egypt',
    code: 'EG',
    longitude: 30.802498,
    latitude: 26.820553
  },
  {
    name: 'Gaza Strip',
    code: 'Gaza Strip',
    longitude: 34.3088255,
    latitude: 31.3546763
  },
  {
    name: 'Indonesia',
    code: 'ID',
    longitude: 113.921327,
    latitude: -0.789275
  },
  {
    name: 'Cuba',
    code: 'CU',
    longitude: -77.781167,
    latitude: 21.521757
  },
  {
    name: 'Heard Island and McDonald Islands',
    code: 'HM',
    longitude: 73.50415799999999,
    latitude: -53.08181
  },
  {
    name: 'Isle of Man',
    code: 'IM',
    longitude: -4.548056,
    latitude: 54.236107
  },
  {
    name: 'Guinea-Bissau',
    code: 'GW',
    longitude: -15.180413,
    latitude: 11.803749
  },
  {
    name: 'Ireland',
    code: 'Ireland',
    longitude: -7.3055309,
    latitude: 53.77975540000001
  },
  {
    name: 'Central African Republic',
    code: 'CF',
    longitude: 20.939444,
    latitude: 6.611110999999999
  },
  {
    name: 'Gibraltar',
    code: 'GI',
    longitude: -5.353585,
    latitude: 36.140751
  },
  {
    name: "Côte d'Ivoire",
    code: 'CI',
    longitude: -5.547079999999999,
    latitude: 7.539988999999999
  },
  {
    name: 'Spain',
    code: 'ES',
    longitude: -3.74922,
    latitude: 40.46366700000001
  },
  {
    name: 'South Georgia and the South Sandwich Islands',
    code: 'GS',
    longitude: -36.587909,
    latitude: -54.429579
  },
  {
    name: 'Macau',
    code: 'MO',
    longitude: 113.543873,
    latitude: 22.198745
  },
  {
    name: 'French Guiana',
    code: 'GF',
    longitude: -53.125782,
    latitude: 3.933889
  },
  {
    name: 'Dominican Republic',
    code: 'DO',
    longitude: -70.162651,
    latitude: 18.735693
  },
  {
    name: 'Honduras',
    code: 'HN',
    longitude: -86.241905,
    latitude: 15.199999
  },
  {
    name: 'Northern Mariana Islands',
    code: 'MP',
    longitude: 145.6739,
    latitude: 15.0979
  },
  {
    name: 'Mongolia',
    code: 'MN',
    longitude: 103.846656,
    latitude: 46.862496
  },
  {
    name: 'Ghana',
    code: 'GH',
    longitude: -1.023194,
    latitude: 7.946527
  },
  {
    name: 'Bhutan',
    code: 'BT',
    longitude: 90.433601,
    latitude: 27.514162
  },
  {
    name: 'Canada',
    code: 'CA',
    longitude: -106.346771,
    latitude: 56.130366
  },
  {
    name: 'South Korea',
    code: 'KR',
    longitude: 127.766922,
    latitude: 35.907757
  },
  {
    name: 'Gambia',
    code: 'GM',
    longitude: -15.310139,
    latitude: 13.443182
  },
  {
    name: 'Kenya',
    code: 'KE',
    longitude: 37.906193,
    latitude: -0.023559
  },
  {
    name: 'Croatia',
    code: 'HR',
    longitude: 15.2,
    latitude: 45.1
  },
  {
    name: 'Germany',
    code: 'DE',
    longitude: 10.451526,
    latitude: 51.165691
  },
  {
    name: 'Hong Kong',
    code: 'HK',
    longitude: 114.1693611,
    latitude: 22.3193039
  },
  {
    name: 'France',
    code: 'FR',
    longitude: 2.213749,
    latitude: 46.227638
  },
  {
    name: 'Cayman Islands',
    code: 'KY',
    longitude: -81.2546,
    latitude: 19.3133
  },
  {
    name: 'Ecuador',
    code: 'EC',
    longitude: -78.18340599999999,
    latitude: -1.831239
  },
  {
    name: 'Guam',
    code: 'GU',
    longitude: 144.793731,
    latitude: 13.444304
  },
  {
    name: 'Kiribati',
    code: 'KI',
    longitude: -157.3768317,
    latitude: 1.8368976
  },
  {
    name: 'Belarus',
    code: 'BY',
    longitude: 27.953389,
    latitude: 53.709807
  },
  {
    name: 'Haiti',
    code: 'HT',
    longitude: -72.285215,
    latitude: 18.971187
  },
  {
    name: 'Congo',
    code: 'CD',
    longitude: 21.758664,
    latitude: -4.038333
  },
  {
    name: 'Greenland',
    code: 'GL',
    longitude: -42.604303,
    latitude: 71.706936
  },
  {
    name: 'Jamaica',
    code: 'JM',
    longitude: -77.297508,
    latitude: 18.109581
  },
  {
    name: 'Iceland',
    code: 'IS',
    longitude: -19.020835,
    latitude: 64.963051
  },
  {
    name: 'Guadeloupe',
    code: 'GP',
    longitude: -61.55099999999999,
    latitude: 16.265
  },
  {
    name: 'Cambodia',
    code: 'KH',
    longitude: 104.990963,
    latitude: 12.565679
  },
  {
    name: 'India',
    code: 'IN',
    longitude: 78.96288,
    latitude: 20.593684
  },
  {
    name: 'Iraq',
    code: 'IQ',
    longitude: 43.679291,
    latitude: 33.223191
  },
  {
    name: 'Kyrgyzstan',
    code: 'KG',
    longitude: 74.766098,
    latitude: 41.20438
  },
  {
    name: 'Guernsey',
    code: 'Guernsey',
    longitude: -2.58949,
    latitude: 49.4481982
  },
  {
    name: 'Colombia',
    code: 'CO',
    longitude: -74.297333,
    latitude: 4.570868
  },
  {
    name: 'Guinea',
    code: 'GN',
    longitude: -9.696645,
    latitude: 9.945587
  },
  {
    name: 'Botswana',
    code: 'BW',
    longitude: 24.684866,
    latitude: -22.328474
  },
  {
    name: 'Georgia',
    code: 'GE',
    longitude: 43.35689199999999,
    latitude: 42.315407
  },
  {
    name: 'Sri Lanka',
    code: 'LK',
    longitude: 80.77179699999999,
    latitude: 7.873053999999999
  },
  {
    name: 'Lebanon',
    code: 'LB',
    longitude: 35.862285,
    latitude: 33.854721
  },
  {
    name: 'Laos',
    code: 'LA',
    longitude: 102.495496,
    latitude: 19.85627
  },
  {
    name: 'Saint Kitts and Nevis',
    code: 'KN',
    longitude: -62.782998,
    latitude: 17.357822
  },
  {
    name: 'Israel',
    code: 'IL',
    longitude: 34.851612,
    latitude: 31.046051
  },
  {
    name: 'Cocos Islands',
    code: 'CC',
    longitude: 96.87095599999999,
    latitude: -12.164165
  },
  {
    name: 'Iran',
    code: 'IR',
    longitude: 53.688046,
    latitude: 32.427908
  },
  {
    name: 'Algeria',
    code: 'DZ',
    longitude: 1.659626,
    latitude: 28.033886
  },
  {
    name: 'Greece',
    code: 'GR',
    longitude: 21.824312,
    latitude: 39.074208
  },
  {
    name: 'Mauritania',
    code: 'MR',
    longitude: -10.940835,
    latitude: 21.00789
  },
  {
    name: 'Montserrat',
    code: 'MS',
    longitude: -62.187366,
    latitude: 16.742498
  },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    longitude: 53.847818,
    latitude: 23.424076
  },
  {
    name: 'Norfolk Island',
    code: 'NF',
    longitude: 167.954712,
    latitude: -29.040835
  },
  {
    name: 'Malaysia',
    code: 'MY',
    longitude: 101.975766,
    latitude: 4.210484
  },
  {
    name: 'Mozambique',
    code: 'MZ',
    longitude: 35.529562,
    latitude: -18.665695
  },
  {
    name: 'Malawi',
    code: 'MW',
    longitude: 34.301525,
    latitude: -13.254308
  },
  {
    name: 'New Caledonia',
    code: 'NC',
    longitude: 165.618042,
    latitude: -20.904305
  },
  {
    name: 'Denmark',
    code: 'DK',
    longitude: 9.501785,
    latitude: 56.26392
  },
  {
    name: 'Japan',
    code: 'JP',
    longitude: 138.252924,
    latitude: 36.204824
  },
  {
    name: 'Nicaragua',
    code: 'NI',
    longitude: -85.207229,
    latitude: 12.865416
  },
  {
    name: 'Namibia',
    code: 'NA',
    longitude: 18.49041,
    latitude: -22.95764
  },
  {
    name: 'Netherlands',
    code: 'NL',
    longitude: 5.291265999999999,
    latitude: 52.132633
  },
  {
    name: 'Maldives',
    code: 'MV',
    longitude: 73.22068,
    latitude: 3.202778
  },
  {
    name: 'Niger',
    code: 'NE',
    longitude: 8.081666,
    latitude: 17.607789
  },
  {
    name: 'Nigeria',
    code: 'NG',
    longitude: 8.675277,
    latitude: 9.081999
  },
  {
    name: 'Pakistan',
    code: 'PK',
    longitude: 69.34511599999999,
    latitude: 30.375321
  },
  {
    name: 'Nepal',
    code: 'NP',
    longitude: 84.12400799999999,
    latitude: 28.394857
  },
  {
    name: 'Norway',
    code: 'NO',
    longitude: 8.468945999999999,
    latitude: 60.47202399999999
  },
  {
    name: 'Mexico',
    code: 'MX',
    longitude: -102.552784,
    latitude: 23.634501
  },
  {
    name: 'French Polynesia',
    code: 'PF',
    longitude: -149.406843,
    latitude: -17.679742
  },
  {
    name: 'Finland',
    code: 'FI',
    longitude: 25.748151,
    latitude: 61.92410999999999
  },
  {
    name: 'Italy',
    code: 'IT',
    longitude: 12.56738,
    latitude: 41.87194
  },
  {
    name: 'Vanuatu',
    code: 'VU',
    longitude: 166.959158,
    latitude: -15.376706
  },
  {
    name: 'Liechtenstein',
    code: 'LI',
    longitude: 9.520935000000001,
    latitude: 47.14103919999999
  },
  {
    name: 'Malta',
    code: 'MT',
    longitude: 14.375416,
    latitude: 35.937496
  },
  {
    name: 'Vietnam',
    code: 'VN',
    longitude: 108.277199,
    latitude: 14.058324
  },
  {
    name: 'Wallis and Futuna',
    code: 'WF',
    longitude: -178.1165,
    latitude: -14.2938
  },
  {
    name: 'Saint Vincent and the Grenadines',
    code: 'VC',
    longitude: -61.287228,
    latitude: 12.984305
  },
  {
    name: 'Mayotte',
    code: 'YT',
    longitude: 45.166244,
    latitude: -12.8275
  },
  {
    name: 'British Virgin Islands',
    code: 'VG',
    longitude: -64.639968,
    latitude: 18.420695
  },
  {
    name: 'Pitcairn Islands',
    code: 'PN',
    longitude: -128.3242376,
    latitude: -24.3767537
  },
  {
    name: 'Timor-Leste',
    code: 'TL',
    longitude: 125.727539,
    latitude: -8.874217
  },
  {
    name: 'North Korea',
    code: 'KP',
    longitude: 127.510093,
    latitude: 40.339852
  },
  {
    name: 'Poland',
    code: 'PL',
    longitude: 19.145136,
    latitude: 51.919438
  },
  {
    name: 'Paraguay',
    code: 'PY',
    longitude: -58.443832,
    latitude: -23.442503
  },
  {
    name: 'Suriname',
    code: 'SR',
    longitude: -56.027783,
    latitude: 3.919305
  },
  {
    name: 'Kuwait',
    code: 'KW',
    longitude: 47.481766,
    latitude: 29.31166
  },
  {
    name: 'Rwanda',
    code: 'RW',
    longitude: 29.873888,
    latitude: -1.940278
  },
  {
    name: 'Portugal',
    code: 'PT',
    longitude: -8.224454,
    latitude: 39.39987199999999
  },
  {
    name: 'Jordan',
    code: 'JO',
    longitude: 36.238414,
    latitude: 30.585164
  },
  {
    name: 'Luxembourg',
    code: 'LU',
    longitude: 6.129582999999999,
    latitude: 49.815273
  },
  {
    name: 'Martinique',
    code: 'MQ',
    longitude: -61.024174,
    latitude: 14.641528
  },
  {
    name: 'Puerto Rico',
    code: 'PR',
    longitude: -66.590149,
    latitude: 18.220833
  },
  {
    name: 'Eswatini',
    code: 'SZ',
    longitude: 31.465866,
    latitude: -26.522503
  },
  {
    name: 'Nauru',
    code: 'NR',
    longitude: 166.931503,
    latitude: -0.522778
  },
  {
    name: 'Comoros',
    code: 'KM',
    longitude: 43.3333,
    latitude: -11.6455
  },
  {
    name: 'Saint Lucia',
    code: 'LC',
    longitude: -60.978893,
    latitude: 13.909444
  },
  {
    name: 'Oman',
    code: 'OM',
    longitude: 55.975413,
    latitude: 21.4735329
  },
  {
    name: 'Romania',
    code: 'RO',
    longitude: 24.96676,
    latitude: 45.943161
  },
  {
    name: 'Switzerland',
    code: 'CH',
    longitude: 8.227511999999999,
    latitude: 46.818188
  },
  {
    name: 'Papua New Guinea',
    code: 'PG',
    longitude: 143.95555,
    latitude: -6.314992999999999
  },
  {
    name: 'Kazakhstan',
    code: 'KZ',
    longitude: 66.923684,
    latitude: 48.019573
  },
  {
    name: 'Russia',
    code: 'RU',
    longitude: 105.318756,
    latitude: 61.52401
  },
  {
    name: 'Jersey',
    code: 'JE',
    longitude: -2.1357662,
    latitude: 49.2137711
  },
  {
    name: 'Slovakia',
    code: 'SK',
    longitude: 19.699024,
    latitude: 48.669026
  },
  {
    name: 'Latvia',
    code: 'LV',
    longitude: 24.603189,
    latitude: 56.879635
  },
  {
    name: 'Niue',
    code: 'NU',
    longitude: -169.867233,
    latitude: -19.054445
  },
  {
    name: 'Solomon Islands',
    code: 'SB',
    longitude: 160.156194,
    latitude: -9.64571
  },
  {
    name: 'Togo',
    code: 'TG',
    longitude: 0.824782,
    latitude: 8.619543
  },
  {
    name: 'Philippines',
    code: 'PH',
    longitude: 121.774017,
    latitude: 12.879721
  },
  {
    name: 'Samoa',
    code: 'WS',
    longitude: -172.104629,
    latitude: -13.759029
  },
  {
    name: 'Saint Helena',
    code: 'Saint Helena',
    longitude: -5.7089241,
    latitude: -15.9650104
  },
  {
    name: 'Uganda',
    code: 'UG',
    longitude: 32.290275,
    latitude: 1.373333
  },
  {
    name: 'Réunion',
    code: 'RE',
    longitude: 55.536384,
    latitude: -21.115141
  },
  {
    name: 'Madagascar',
    code: 'MG',
    longitude: 46.869107,
    latitude: -18.766947
  },
  {
    name: 'French Southern and Antarctic Lands',
    code: 'TF',
    longitude: 69.348557,
    latitude: -49.280366
  },
  {
    name: 'Serbia',
    code: 'RS',
    longitude: 21.005859,
    latitude: 44.016521
  },
  {
    name: 'Taiwan',
    code: 'TW',
    longitude: 120.960515,
    latitude: 23.69781
  },
  {
    name: 'Thailand',
    code: 'TH',
    longitude: 100.992541,
    latitude: 15.870032
  },
  {
    name: 'El Salvador',
    code: 'SV',
    longitude: -88.89653,
    latitude: 13.794185
  },
  {
    name: 'Seychelles',
    code: 'SC',
    longitude: 55.491977,
    latitude: -4.679574
  },
  {
    name: 'United States',
    code: 'US',
    longitude: -95.712891,
    latitude: 37.09024
  },
  {
    name: 'New Zealand',
    code: 'NZ',
    longitude: 174.885971,
    latitude: -40.900557
  },
  {
    name: 'South Africa',
    code: 'ZA',
    longitude: 22.937506,
    latitude: -30.559482
  },
  {
    name: 'Kosovo',
    code: 'XK',
    longitude: 20.902977,
    latitude: 42.6026359
  },
  {
    name: 'Sierra Leone',
    code: 'SL',
    longitude: -11.779889,
    latitude: 8.460555
  },
  {
    name: 'Panama',
    code: 'PA',
    longitude: -80.782127,
    latitude: 8.537981
  },
  {
    name: 'Zimbabwe',
    code: 'ZW',
    longitude: 29.154857,
    latitude: -19.015438
  },
  {
    name: 'Liberia',
    code: 'LR',
    longitude: -9.429499000000002,
    latitude: 6.428055
  },
  {
    name: 'Lithuania',
    code: 'LT',
    longitude: 23.881275,
    latitude: 55.169438
  },
  {
    name: 'Mauritius',
    code: 'MU',
    longitude: 57.55215200000001,
    latitude: -20.348404
  },
  {
    name: 'Qatar',
    code: 'QA',
    longitude: 51.183884,
    latitude: 25.354826
  },
  {
    name: 'Saudi Arabia',
    code: 'SA',
    longitude: 45.079162,
    latitude: 23.885942
  },
  {
    name: 'Peru',
    code: 'PE',
    longitude: -75.015152,
    latitude: -9.189967
  },
  {
    name: 'Turkmenistan',
    code: 'TM',
    longitude: 59.556278,
    latitude: 38.969719
  },
  {
    name: 'Somalia',
    code: 'SO',
    longitude: 46.199616,
    latitude: 5.152149
  },
  {
    name: 'Svalbard and Jan Mayen',
    code: 'Jan Mayen',
    longitude: -8.2920347,
    latitude: 71.031818
  },
  {
    name: 'U.S. Virgin Islands',
    code: 'VI',
    longitude: -64.896335,
    latitude: 18.335765
  },
  {
    name: 'Sweden',
    code: 'SE',
    longitude: 18.643501,
    latitude: 60.12816100000001
  },
  {
    name: 'Palestinian Territories',
    code: 'PS',
    longitude: 35.233154,
    latitude: 31.952162
  },
  {
    name: 'Palau',
    code: 'PW',
    longitude: 134.58252,
    latitude: 7.514979999999999
  },
  {
    name: 'Saint Pierre and Miquelon',
    code: 'PM',
    longitude: -56.3159,
    latitude: 46.8852
  },
  {
    name: 'São Tomé and Príncipe',
    code: 'ST',
    longitude: 6.613080999999999,
    latitude: 0.18636
  },
  {
    name: 'Turkey',
    code: 'TR',
    longitude: 35.243322,
    latitude: 38.963745
  },
  {
    name: 'San Marino',
    code: 'SM',
    longitude: 12.457777,
    latitude: 43.94236
  },
  {
    name: 'Singapore',
    code: 'SG',
    longitude: 103.819836,
    latitude: 1.352083
  },
  {
    name: 'Turks and Caicos Islands',
    code: 'TC',
    longitude: -71.797928,
    latitude: 21.694025
  },
  {
    name: 'Slovenia',
    code: 'SI',
    longitude: 14.995463,
    latitude: 46.151241
  },
  {
    name: 'Senegal',
    code: 'SN',
    longitude: -14.452362,
    latitude: 14.497401
  },
  {
    name: 'Tokelau',
    code: 'TK',
    longitude: -171.8484,
    latitude: -9.200199999999999
  },
  {
    name: 'Syrian Arab Republic',
    code: 'SY',
    longitude: 38.996815,
    latitude: 34.80207499999999
  },
  {
    name: 'Tanzania',
    code: 'TZ',
    longitude: 34.888822,
    latitude: -6.369028
  },
  {
    name: 'Trinidad and Tobago',
    code: 'TT',
    longitude: -61.222503,
    latitude: 10.691803
  },
  {
    name: 'Tunisia',
    code: 'TN',
    longitude: 9.537499,
    latitude: 33.886917
  },
  {
    name: 'Chad',
    code: 'TD',
    longitude: 18.732207,
    latitude: 15.454166
  },
  {
    name: 'South Sudan',
    code: 'SS',
    longitude: 31.3069788,
    latitude: 6.876991899999999
  },
  {
    name: 'Tuvalu',
    code: 'TV',
    longitude: 177.64933,
    latitude: -7.109534999999999
  },
  {
    name: 'Zambia',
    code: 'ZM',
    longitude: 27.849332,
    latitude: -13.133897
  },
  {
    name: 'Vatican City',
    code: 'VA',
    longitude: 12.453389,
    latitude: 41.902916
  },
  {
    name: 'Yemen',
    code: 'YE',
    longitude: 48.516388,
    latitude: 15.552727
  },
  {
    name: 'Venezuela',
    code: 'VE',
    longitude: -66.58973,
    latitude: 6.42375
  },
  {
    name: 'Ukraine',
    code: 'UA',
    longitude: 31.16558,
    latitude: 48.379433
  },
  {
    name: 'Tajikistan',
    code: 'TJ',
    longitude: 71.276093,
    latitude: 38.861034
  },
  {
    name: 'Uzbekistan',
    code: 'UZ',
    longitude: 64.585262,
    latitude: 41.377491
  },
  {
    name: 'Tonga',
    code: 'TO',
    longitude: -175.198242,
    latitude: -21.178986
  },
  {
    name: 'Uruguay',
    code: 'UY',
    longitude: -55.765835,
    latitude: -32.522779
  }
]
export function getByName (name:string) {
  const results = Countries.find(country => country.name.toLowerCase() === name.toLowerCase()) as CountryInfo | null
  return results
}
