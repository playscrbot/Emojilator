import React, { Component, useCallback, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, Rectangle } from 'react-leaflet';
import L from 'leaflet';
import './Leaflet.css';
import { Link } from 'react-router';

L.Icon.Default.imagePath = '/leaflet/';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png'
});

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

const BOUNDS_STYLE = { weight: 1 }

function MinimapBounds({ parentMap, zoom }) {
  const minimap = useMap();

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap],
  );
  useMapEvent('click', onClick);

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  // Listen to events on the parent map
  useMapEvent('moveend', onChange); // Listen for move events
  useMapEvent('zoomend', onChange);  // Listen for zoom events

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
}

function MinimapControl({ position, zoom }) {
  const parentMap = useMap()
  const mapZoom = zoom || 0

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    [],
  )

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  )
}

const countriesData = [
  { name: 'Germany', lat: 51.1657, lng: 10.4515, emoji: '🇩🇪', culture: '🍺🕰️🎭' },
  { name: 'Brazil', lat: -14.2350, lng: -51.9253, emoji: '🇧🇷', culture: '🎉🏞️🎶' },
  { name: 'South Africa', lat: -30.5595, lng: 22.9375, emoji: '🇿🇦', culture: '🦓🌍🏞️' },
  { name: 'India', lat: 20.5937, lng: 78.9629, emoji: '🇮🇳', culture: '🕌🎭🎵' },
  { name: 'Russia', lat: 61.5240, lng: 105.3188, emoji: '🇷🇺', culture: '❄️🏰🎨' },
  { name: 'France', lat: 46.6035, lng: 1.8883, emoji: '🇫🇷', culture: '🍷🎨🥖' },
  { name: 'Mexico', lat: 23.6345, lng: -102.5528, emoji: '🇲🇽', culture: '🌮🎉🏜️' },
  { name: 'Italy', lat: 41.8719, lng: 12.5675, emoji: '🇮🇹', culture: '🍕🎨🎭' },
  { name: 'China', lat: 35.8617, lng: 104.1954, emoji: '🇨🇳', culture: '🏯🎋🍜' },
  { name: 'Argentina', lat: -38.4161, lng: -63.6167, emoji: '🇦🇷', culture: '🥩🍷🎶' },
  { name: 'Spain', lat: 40.4637, lng: -3.7492, emoji: '🇪🇸', culture: '🍷🎶🏰' },
  { name: 'Nigeria', lat: 9.0820, lng: 8.6753, emoji: '🇳🇬', culture: '🥘🎶🌍' },
  { name: 'Egypt', lat: 26.8206, lng: 30.8025, emoji: '🇪🇬', culture: '🏰🌅🐫' },
  { name: 'South Korea', lat: 35.9078, lng: 127.7669, emoji: '🇰🇷', culture: '🥢🎶🏯' },
  { name: 'Turkey', lat: 38.9637, lng: 35.2433, emoji: '🇹🇷', culture: '🍢🎶🏰' },
  { name: 'Saudi Arabia', lat: 23.8859, lng: 45.0792, emoji: '🇸🇦', culture: '🏰🌅🐫' },
  { name: 'Indonesia', lat: -2.4413, lng: 120.4194, emoji: '🇮🇩', culture: '🍛🎉🏞️' },
  { name: 'Canada', lat: 56.1304, lng: -106.3468, emoji: '🇨🇦', culture: '🍁🏞️🏒' },
  { name: 'Australia', lat: -25.2744, lng: 133.7751, emoji: '🇦🇺', culture: '🦘🏞️🏖️' },
  { name: 'Japan', lat: 36.2048, lng: 138.2529, emoji: '🇯🇵', culture: '🍣🏯🌸' },
  { name: 'Chile', lat: -35.6751, lng: -71.5430, emoji: '🇨🇱', culture: '🍇🌋🎭' },
  { name: 'Netherlands', lat: 52.1326, lng: 5.2913, emoji: '🇳🇱', culture: '🌷🚲🎨' },
  { name: 'Ghana', lat: 7.9450, lng: -1.0232, emoji: '🇬🇭', culture: '🥘🥁🌍' },
  { name: 'Norway', lat: 60.4720, lng: 8.4689, emoji: '🇳🇴', culture: '❄️🏞️🎻' },
  { name: 'Pakistan', lat: 30.3753, lng: 69.3451, emoji: '🇵🇰', culture: '🕌🎶🏞️' },
  { name: 'Peru', lat: -9.1900, lng: -75.0152, emoji: '🇵🇪', culture: '🏞️🎶🌽' },
  { name: 'Thailand', lat: 15.8700, lng: 100.9925, emoji: '🇹🇭', culture: '🏝️🎉🍜' },
  { name: 'Ireland', lat: 53.4129, lng: -8.2439, emoji: '🇮🇪', culture: '☘️🎻🍺' },
  { name: 'Kenya', lat: -1.2921, lng: 36.8219, emoji: '🇰🇪', culture: '🦓🌍🎶' },
  { name: 'Sweden', lat: 60.1282, lng: 18.6435, emoji: '🇸🇪', culture: '🏞️🎵🎭' },
  { name: 'Switzerland', lat: 46.8182, lng: 8.2275, emoji: '🇨🇭', culture: '⛰️🍫🏞️' },
  { name: 'Vietnam', lat: 14.0583, lng: 108.2772, emoji: '🇻🇳', culture: '🍜🏞️🎶' },
  { name: 'Colombia', lat: 4.5709, lng: -74.2973, emoji: '🇨🇴', culture: '🌺🎶🍲' },
  { name: 'Finland', lat: 61.9241, lng: 25.7482, emoji: '🇫🇮', culture: '❄️🏞️🎶' },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, emoji: '🇸🇬', culture: '🏙️🍜🏞️' },
  { name: 'Portugal', lat: 39.3999, lng: -8.2245, emoji: '🇵🇹', culture: '🍷🎶🏞️' },
  { name: 'Morocco', lat: 31.7917, lng: -7.0926, emoji: '🇲🇦', culture: '🏰🌅🐫' },
  { name: 'Austria', lat: 47.5162, lng: 14.5501, emoji: '🇦🇹', culture: '🏰🎼🍰' },
  { name: 'Greece', lat: 39.0742, lng: 21.8243, emoji: '🇬🇷', culture: '🏛️🏖️🍇' },
  { name: 'Ukraine', lat: 48.3794, lng: 31.1656, emoji: '🇺🇦', culture: '❄️🏰🎻' },
  { name: 'Belgium', lat: 50.8503, lng: 4.3517, emoji: '🇧🇪', culture: '🍫🏰🎭' },
  { name: 'Philippines', lat: 12.8797, lng: 121.7740, emoji: '🇵🇭', culture: '🏝️🍜🎉' },
  { name: 'Algeria', lat: 28.0339, lng: 1.6596, emoji: '🇩🇿', culture: '🏜️🏞️🐫' },
  { name: 'Czech Republic', lat: 49.8175, lng: 15.4729, emoji: '🇨🇿', culture: '🏰🍺🎭' },
  { name: 'Romania', lat: 45.9432, lng: 24.9668, emoji: '🇷🇴', culture: '🏰🎭🎶' },
  { name: 'New Zealand', lat: -40.9006, lng: 174.8860, emoji: '🇳🇿', culture: '🏞️🐦🏉' },
  { name: 'Iran', lat: 32.4279, lng: 53.6880, emoji: '🇮🇷', culture: '🕌🎭🎶' },
  { name: 'Hungary', lat: 47.1625, lng: 19.5033, emoji: '🇭🇺', culture: '🏰🍲🎻' },
  { name: 'Bangladesh', lat: 23.6850, lng: 90.3563, emoji: '🇧🇩', culture: '🕌🎶🍛' },
  { name: 'Iraq', lat: 33.3152, lng: 44.3661, emoji: '🇮🇶', culture: '🏰🌅🍢' },
  { name: 'Denmark', lat: 56.2639, lng: 9.5018, emoji: '🇩🇰', culture: '🏰🎢🍻' },
  { name: 'Sri Lanka', lat: 7.8731, lng: 80.7718, emoji: '🇱🇰', culture: '🏝️🕌🎶' },
  { name: 'Angola', lat: -11.2027, lng: 17.8739, emoji: '🇦🇴', culture: '🏞️🦓🌍' },
  { name: 'Tanzania', lat: -6.369028, lng: 34.8888, emoji: '🇹🇿', culture: '🏞️🌍🎶' },
  { name: 'Cuba', lat: 21.5218, lng: -77.7812, emoji: '🇨🇺', culture: '🎺🏝️🍲' },
  { name: 'Ethiopia', lat: 9.1450, lng: 40.4897, emoji: '🇪🇹', culture: '🏰🌍🎶' },
  { name: 'Iceland', lat: 64.9631, lng: -19.0208, emoji: '🇮🇸', culture: '❄️🏞️🎶' },
  { name: 'Malta', lat: 35.9375, lng: 14.3754, emoji: '🇲🇹', culture: '🏰🏝️🍷' },
  { name: 'Mongolia', lat: 46.8625, lng: 103.8467, emoji: '🇲🇳', culture: '🏞️🐎🍜' },
  { name: 'Croatia', lat: 45.1000, lng: 15.2000, emoji: '🇭🇷', culture: '🏰🏖️🍲' },
  { name: 'Panama', lat: 8.5380, lng: -80.7821, emoji: '🇵🇦', culture: '🏝️🌮🎶' },
  { name: 'Ecuador', lat: -1.8312, lng: -78.1834, emoji: '🇪🇨', culture: '🌺🎵🍲' },
  { name: 'Zimbabwe', lat: -19.0154, lng: 29.1549, emoji: '🇿🇼', culture: '🏞️🌍🎶' },
  { name: 'Mozambique', lat: -18.6657, lng: 35.5296, emoji: '🇲🇿', culture: '🏞️🌊🎶' },
  { name: 'Latvia', lat: 56.8796, lng: 24.6032, emoji: '🇱🇻', culture: '🏰🌲🎶' },
  { name: 'Lebanon', lat: 33.8547, lng: 35.8623, emoji: '🇱🇧', culture: '🏰🎶🍢' },
  { name: 'Tunisia', lat: 33.8869, lng: 9.5375, emoji: '🇹🇳', culture: '🏝️🏰🍲' },
  { name: 'Uruguay', lat: -32.5228, lng: -55.7658, emoji: '🇺🇾', culture: '🍖🍷🎶' },
  { name: 'Cameroon', lat: 7.3697, lng: 12.3547, emoji: '🇨🇲', culture: '🦓🌍🎶' },
  { name: 'Lithuania', lat: 55.1694, lng: 23.8813, emoji: '🇱🇹', culture: '🏰🌲🎶' },
  { name: 'Bolivia', lat: -16.2902, lng: -63.5887, emoji: '🇧🇴', culture: '🌺🏞️🎶' },
  { name: 'Cameroon', lat: 7.3697, lng: 12.3547, emoji: '🇨🇲', culture: '🦓🌍🎶' },
  { name: 'Qatar', lat: 25.2769, lng: 51.5200, emoji: '🇶🇦', culture: '🏰🌅🐫' },
  { name: 'Montenegro', lat: 42.7087, lng: 19.3744, emoji: '🇲🇪', culture: '🏰🌊🍲' },
  { name: 'Nepal', lat: 28.3949, lng: 84.1240, emoji: '🇳🇵', culture: '🏔️🕌🎶' },
  { name: 'Gambia', lat: 13.4432, lng: -15.3101, emoji: '🇬🇲', culture: '🏞️🌍🎶' },
  { name: 'Bahrain', lat: 26.0667, lng: 50.5577, emoji: '🇧🇭', culture: '🏰🌅🐫' },
  { name: 'Namibia', lat: -22.5597, lng: 17.0832, emoji: '🇳🇦', culture: '🏞️🌍🐘' },
  { name: 'Luxembourg', lat: 49.8153, lng: 6.1296, emoji: '🇱🇺', culture: '🏰🍷🍫' },
  { name: 'Estonia', lat: 58.5953, lng: 25.0136, emoji: '🇪🇪', culture: '🏰🌲🎶' },
  { name: 'Congo', lat: -0.2280, lng: 15.8277, emoji: '🇨🇬', culture: '🦓🌍🎶' },
  { name: 'Fiji', lat: -17.7134, lng: 178.0650, emoji: '🇫🇯', culture: '🏝️🌺🎶' },
  { name: 'Kyrgyzstan', lat: 41.2044, lng: 74.7661, emoji: '🇰🇬', culture: '🏔️🎶🍜' },
  { name: 'Senegal', lat: 14.4974, lng: -14.4524, emoji: '🇸🇳', culture: '🏞️🌍🎶' },
  { name: 'Madagascar', lat: -18.7669, lng: 46.8691, emoji: '🇲🇬', culture: '🏞️🌺🎶' },
  { name: 'Guatemala', lat: 15.7835, lng: -90.2308, emoji: '🇬🇹', culture: '🌮🎉🏞️' },
  { name: 'Georgia', lat: 42.3154, lng: 43.3569, emoji: '🇬🇪', culture: '🏰🌲🎶' },
  { name: 'Tajikistan', lat: 38.8610, lng: 71.2761, emoji: '🇹🇯', culture: '🏔️🕌🎶' },
  { name: 'Mali', lat: 17.5707, lng: -3.9962, emoji: '🇲🇱', culture: '🏞️🌍🎶' },
  { name: 'Gabon', lat: -0.8037, lng: 11.6094, emoji: '🇬🇦', culture: '🏞️🌍🎶' },
  { name: 'Cyprus', lat: 35.1264, lng: 33.4299, emoji: '🇨🇾', culture: '🏰🌊🍲' },
  { name: 'Honduras', lat: 15.1990, lng: -86.2419, emoji: '🇭🇳', culture: '🌮🎉🏞️' },
  { name: 'Bhutan', lat: 27.5142, lng: 90.4336, emoji: '🇧🇹', culture: '🏔️🏰🎶' },
  { name: 'Moldova', lat: 47.4116, lng: 28.3699, emoji: '🇲🇩', culture: '🏰🍇🎶' },
  { name: 'Laos', lat: 19.8563, lng: 102.4955, emoji: '🇱🇦', culture: '🏞️🍜🎶' },
  { name: 'Burkina Faso', lat: 12.2383, lng: -1.5616, emoji: '🇧🇫', culture: '🏞️🌍🎶' },
  { name: 'Lesotho', lat: -29.6099, lng: 28.2336, emoji: '🇱🇸', culture: '🏞️🌍🎶' },
  { name: 'Burundi', lat: -3.3731, lng: 29.9189, emoji: '🇧🇮', culture: '🏞️🌍🎶' },
  { name: 'Mauritius', lat: -20.3484, lng: 57.5522, emoji: '🇲🇺', culture: '🏝️🌺🎶' },
  { name: 'Sierra Leone', lat: 8.4606, lng: -11.7799, emoji: '🇸🇱', culture: '🏞️🌍🎶' },
  { name: 'Malawi', lat: -13.2543, lng: 34.3015, emoji: '🇲🇼', culture: '🏞️🌍🎶' },
  { name: 'Eswatini', lat: -26.5225, lng: 31.4659, emoji: '🇸🇿', culture: '🏞️🌍🎶' },
  { name: 'Guyana', lat: 4.8604, lng: -58.9302, emoji: '🇬🇾', culture: '🏞️🌺🎶' },
  { name: 'Grenada', lat: 12.1165, lng: -61.6789, emoji: '🇬🇩', culture: '🏝️🌺🎶' },
  { name: 'Dominican Republic', lat: 18.7357, lng: -70.1627, emoji: '🇩🇴', culture: '🏖️🎉🍲' },
  { name: 'Burma', lat: 21.9162, lng: 95.9560, emoji: '🇲🇲', culture: '🏞️🍜🎶' },
  { name: 'Suriname', lat: 3.9193, lng: -56.0278, emoji: '🇸🇷', culture: '🏞️🌺🎶' },
  { name: 'Benin', lat: 9.3077, lng: 2.3158, emoji: '🇧🇯', culture: '🏞️🌍🎶' },
  { name: 'Niger', lat: 17.6078, lng: 8.0817, emoji: '🇳🇪', culture: '🏞️🌍🎶' },
  { name: 'Central African Republic', lat: 6.6111, lng: 20.9394, emoji: '🇨🇫', culture: '🏞️🌍🎶' },
  { name: 'Barbados', lat: 13.1939, lng: -59.5432, emoji: '🇧🇧', culture: '🏝️🌺🎶' },
  { name: 'Belize', lat: 17.1899, lng: -88.4976, emoji: '🇧🇿', culture: '🏝️🎉🍲' },
  { name: 'Comoros', lat: -11.6455, lng: 43.3333, emoji: '🇰🇲', culture: '🏝️🌍🎶' },
  { name: 'Maldives', lat: 3.2028, lng: 73.2207, emoji: '🇲🇻', culture: '🏝️🌺🎶' },
  { name: 'Seychelles', lat: -4.6796, lng: 55.4920, emoji: '🇸🇨', culture: '🏝️🌺🎶' },
  { name: 'Solomon Islands', lat: -9.2010, lng: 160.1562, emoji: '🇸🇧', culture: '🏝️🌊🎶' },
  { name: 'Vanuatu', lat: -15.3767, lng: 166.9592, emoji: '🇻🇺', culture: '🏝️🌺🎶' },
  { name: 'Palau', lat: 7.5150, lng: 134.5825, emoji: '🇵🇼', culture: '🏝️🌺🎶' },
  { name: 'Kiribati', lat: -3.3704, lng: -168.7340, emoji: '🇰🇮', culture: '🏝️🌺🎶' },
  { name: 'Timor-Leste', lat: -8.8742, lng: 125.7275, emoji: '🇹🇱', culture: '🏞️🌺🎶' },
  { name: 'Togo', lat: 8.6195, lng: 0.8248, emoji: '🇹🇬', culture: '🏞️🌍🎶' },
  { name: 'Tuvalu', lat: -7.1095, lng: 177.6493, emoji: '🇹🇻', culture: '🏝️🌺🎶' },
  { name: 'Eritrea', lat: 15.1794, lng: 39.7823, emoji: '🇪🇷', culture: '🏞️🌍🎶' },
  { name: 'Swaziland', lat: -26.5225, lng: 31.4659, emoji: '🇸🇿', culture: '🏞️🌍🎶' },
  { name: 'Malta', lat: 35.9375, lng: 14.3754, emoji: '🇲🇹', culture: '🏰🏝️🍷' },
  { name: 'Monaco', lat: 43.7384, lng: 7.4246, emoji: '🇲🇨', culture: '🏰🍷🏖️' },
  { name: 'San Marino', lat: 43.9424, lng: 12.4578, emoji: '🇸🇲', culture: '🏰🍷🎭' },
  { name: 'Nauru', lat: -0.5228, lng: 166.9315, emoji: '🇳🇷', culture: '🏝️🌺🎶' },
  { name: 'Saint Kitts and Nevis', lat: 17.3578, lng: -62.7821, emoji: '🇰🇳', culture: '🏝️🌺🎶' },
  { name: 'Saint Lucia', lat: 13.9094, lng: -60.9789, emoji: '🇱🇨', culture: '🏝️🌺🎶' },
  { name: 'Saint Vincent and the Grenadines', lat: 13.2528, lng: -61.1971, emoji: '🇻🇨', culture: '🏝️🌺🎶' },
  { name: 'Samoa', lat: -13.7590, lng: -172.1046, emoji: '🇼🇸', culture: '🏝️🌺🎶' },
  { name: 'Sao Tome and Principe', lat: 0.1864, lng: 6.6131, emoji: '🇸🇹', culture: '🏞️🌍🎶' },
  { name: 'Seychelles', lat: -4.6796, lng: 55.4920, emoji: '🇸🇨', culture: '🏝️🌺🎶' },
  { name: 'St. Pierre and Miquelon', lat: 46.8852, lng: -56.3159, emoji: '🇵🇲', culture: '🏝️🌊🎶' },
  { name: 'Suriname', lat: 3.9193, lng: -56.0278, emoji: '🇸🇷', culture: '🏞️🌺🎶' },
  { name: 'Tonga', lat: -21.1784, lng: -175.1982, emoji: '🇹🇴', culture: '🏝️🌺🎶' },
  { name: 'Turkmenistan', lat: 38.9697, lng: 59.5563, emoji: '🇹🇲', culture: '🏞️🕌🎶' },
  { name: 'Antigua and Barbuda', lat: 17.0608, lng: -61.7964, emoji: '🇦🇬', culture: '🏝️🌺🎶' },
  { name: 'Armenia', lat: 40.0691, lng: 45.0382, emoji: '🇦🇲', culture: '🏰🌲🎶' },
  { name: 'Bahrain', lat: 26.0667, lng: 50.5577, emoji: '🇧🇭', culture: '🏰🌅🐫' },
  { name: 'Brunei', lat: 4.5353, lng: 114.7277, emoji: '🇧🇳', culture: '🏞️🕌🎶' },
  { name: 'Djibouti', lat: 11.8251, lng: 42.5903, emoji: '🇩🇯', culture: '🏞️🌍🎶' },
  { name: 'Dominica', lat: 15.4149, lng: -61.3705, emoji: '🇩🇲', culture: '🏝️🌺🎶' },
  { name: 'Equatorial Guinea', lat: 1.6508, lng: 10.2679, emoji: '🇬🇶', culture: '🏞️🌍🎶' },
  { name: 'Grenada', lat: 12.1165, lng: -61.6789, emoji: '🇬🇩', culture: '🏝️🌺🎶' },
  { name: 'Guinea', lat: 9.9456, lng: -9.6966, emoji: '🇬🇳', culture: '🏞️🌍🎶' },
  { name: 'Guinea-Bissau', lat: 11.8037, lng: -15.1804, emoji: '🇬🇼', culture: '🏞️🌍🎶' },
  { name: 'Kiribati', lat: -3.3704, lng: -168.7340, emoji: '🇰🇮', culture: '🏝️🌺🎶' },
  { name: 'Maldives', lat: 3.2028, lng: 73.2207, emoji: '🇲🇻', culture: '🏝️🌺🎶' },
  { name: 'Marshall Islands', lat: 7.1315, lng: 171.1845, emoji: '🇲🇭', culture: '🏝️🌊🎶' },
  { name: 'Micronesia', lat: 7.4256, lng: 150.5508, emoji: '🇫🇲', culture: '🏝️🌊🎶' },
  { name: 'Nauru', lat: -0.5228, lng: 166.9315, emoji: '🇳🇷', culture: '🏝️🌺🎶' },
  { name: 'Palau', lat: 7.5150, lng: 134.5825, emoji: '🇵🇼', culture: '🏝️🌺🎶' },
  { name: 'Papua New Guinea', lat: -6.3146, lng: 143.9555, emoji: '🇵🇬', culture: '🏝️🌺🎶' },
  { name: 'Sao Tome and Principe', lat: 0.1864, lng: 6.6131, emoji: '🇸🇹', culture: '🏞️🌍🎶' },
  { name: 'Seychelles', lat: -4.6796, lng: 55.4920, emoji: '🇸🇨', culture: '🏝️🌺🎶' },
  { name: 'Solomon Islands', lat: -9.2010, lng: 160.1562, emoji: '🇸🇧', culture: '🏝️🌊🎶' },
  { name: 'Andorra', lat: 42.5063, lng: 1.5218, emoji: '🇦🇩', culture: '🏰🎨🎭' },
  { name: 'Angola', lat: -11.2027, lng: 17.8739, emoji: '🇦🇴', culture: '🏞️🌍🎶' },
  { name: 'Bangladesh', lat: 23.6850, lng: 90.3563, emoji: '🇧🇩', culture: '🕌🎶🍛' },
  { name: 'Belize', lat: 17.1899, lng: -88.4976, emoji: '🇧🇿', culture: '🏝️🎉🍲' },
  { name: 'Burundi', lat: -3.3731, lng: 29.9189, emoji: '🇧🇮', culture: '🏞️🌍🎶' },
  { name: 'Cape Verde', lat: 16.5388, lng: -23.0418, emoji: '🇨🇻', culture: '🏝️🌊🎶' },
  { name: 'Costa Rica', lat: 9.7489, lng: -83.7534, emoji: '🇨🇷', culture: '🌮🏝️🎶' },
  { name: 'El Salvador', lat: 13.7942, lng: -88.8965, emoji: '🇸🇻', culture: '🌮🏞️🎶' },
  { name: 'Federated States of Micronesia', lat: 6.8874, lng: 158.2150, emoji: '🇫🇲', culture: '🏝️🌊🎶' },
  { name: 'Gambia', lat: 13.4432, lng: -15.3101, emoji: '🇬🇲', culture: '🏞️🌍🎶' },
  { name: 'Guinea', lat: 9.9456, lng: -9.6966, emoji: '🇬🇳', culture: '🏞️🌍🎶' },
  { name: 'Guyana', lat: 4.8604, lng: -58.9302, emoji: '🇬🇾', culture: '🏞️🌺🎶' },
  { name: 'Honduras', lat: 15.1990, lng: -86.2419, emoji: '🇭🇳', culture: '🌮🎉🏞️' },
  { name: 'Jamaica', lat: 18.1096, lng: -77.2975, emoji: '🇯🇲', culture: '🏝️🎶🎉' },
  { name: 'Kuwait', lat: 29.3759, lng: 47.9774, emoji: '🇰🇼', culture: '🏰🌅🐫' },
  { name: 'Malawi', lat: -13.2543, lng: 34.3015, emoji: '🇲🇼', culture: '🏞️🌍🎶' },
  { name: 'Mauritania', lat: 21.0079, lng: -10.9408, emoji: '🇲🇷', culture: '🏞️🌍🎶' },
  { name: 'Morocco', lat: 31.7917, lng: -7.0926, emoji: '🇲🇦', culture: '🕌🏞️🎶' },
  { name: 'Netherlands', lat: 12.2261, lng: -68.6024, emoji: '🇧🇶', culture: '🏝️🌊🎶' },
  { name: 'Afghanistan', lat: 33.9391, lng: 67.7100, emoji: '🇦🇫', culture: '🕌🏞️🎶' },
  { name: 'Austria', lat: 47.5162, lng: 14.5501, emoji: '🇦🇹', culture: '🏰🎶🍺' },
  { name: 'Botswana', lat: -22.3285, lng: 24.6849, emoji: '🇧🇼', culture: '🏞️🌍🎶' },
  { name: 'South Sudan', lat: 6.8770, lng: 31.3070, emoji: '🇸🇸', culture: '🏞️🌍🎶' },
  { name: 'Côte d\'Ivoire', lat: 7.5400, lng: -5.5471, emoji: '🇨🇮', culture: '🎶🥘🎉' },
  { name: 'Liberia', lat: 6.4281, lng: -9.4295, emoji: '🇱🇷', culture: '🏞️🌍🎶' },
  { name: 'Malaysia', lat: 4.2105, lng: 101.9758, emoji: '🇲🇾', culture: '🍛🏞️🏯' },
  { name: 'Democratic Republic of Congo', lat: -4.0383, lng: 21.7587, emoji: '🇨🇩', culture: '🏞️🌍🎶' },
  { name: 'Paraguay', lat: -23.4425, lng: -58.4438, emoji: '🇵🇾', culture: '🏞️🌮🎶' },
  { name: 'United States', lat: 37.7749, lng: -122.4194, emoji: '🇺🇸', culture: '🗽🍔🎶' },
  { name: 'United Kingdom', lat: 55.3781, lng: -3.4360, emoji: '🇬🇧', culture: '🏰🍵🎶' },
  { name: 'Greenland', lat: 71.7069, lng: -42.6043, emoji: '🇬🇱', culture: '❄️🏔️🎣' },
  { name: 'North Korea', lat: 40.3399, lng: 127.5101, emoji: '🇰🇵', culture: '🏞️🎎🎶' },
  { name: 'Venezuela', lat: 6.4238, lng: -66.5897, emoji: '🇻🇪', culture: '🏞️🍖🎶' },
  { name: 'Zambia', lat: -13.1339, lng: 27.8493, emoji: '🇿🇲', culture: '🏞️🌍🎶' },
  { name: 'Uganda', lat: 1.3733, lng: 32.2903, emoji: '🇺🇬', culture: '🏞️🌍🎶' },
  { name: 'Somalia', lat: 5.1521, lng: 46.1996, emoji: '🇸🇴', culture: '🏞️🌍🎶' }
];

class Explore extends Component {
  state = {
    lat: 0,
    lng: 0,
    zoom: 2,
  };

  render() {
    return (
      <div className="map-container">
        <MapContainer center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} className="custom-map">
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />
        <MinimapControl position="topright" />
        {countriesData.map((country, index) => (
          <Marker
            key={index}
            position={[country.lat, country.lng]}
            icon={new L.DivIcon({
              className: 'custom-marker',
              html: country.emoji,
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            })}
          >
            <Popup>
              <strong style={{ marginTop: "10px" }}>{country.name} {country.emoji}</strong>
              Culture: {country.culture}
            </Popup>
          </Marker>
        ))}
        </MapContainer>
        <Link to="/" className="menu-item">
          Home
        </Link>
      </div>
    );
  }
}

export default Explore;