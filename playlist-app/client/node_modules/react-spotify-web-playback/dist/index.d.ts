import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, PureComponent } from 'react';

declare const ERROR_TYPE: {
    readonly ACCOUNT: "account";
    readonly AUTHENTICATION: "authentication";
    readonly INITIALIZATION: "initialization";
    readonly PLAYBACK: "playback";
    readonly PLAYER: "player";
};
declare const STATUS: {
    readonly ERROR: "ERROR";
    readonly IDLE: "IDLE";
    readonly INITIALIZING: "INITIALIZING";
    readonly READY: "READY";
    readonly RUNNING: "RUNNING";
    readonly UNSUPPORTED: "UNSUPPORTED";
};
declare const TYPE: {
    readonly DEVICE: "device_update";
    readonly FAVORITE: "favorite_update";
    readonly PLAYER: "player_update";
    readonly PRELOAD: "preload_update";
    readonly PROGRESS: "progress_update";
    readonly STATUS: "status_update";
    readonly TRACK: "track_update";
};

type SpotifyPlayerCallback = (token: string) => void;
type SpotifyAlbum = Spotify.Album;
type SpotifyArtist = SpotifyApi.ArtistObjectSimplified;
type SpotifyDevice = SpotifyApi.UserDevice;
interface SpotifyPlayOptions {
    context_uri?: string;
    deviceId: string;
    offset?: number;
    uris?: string[];
}
interface SpotifyTrack {
    artists: Pick<SpotifyArtist, 'name' | 'uri'>[];
    durationMs: number;
    id: string;
    image: string;
    name: string;
    uri: string;
}
interface WebPlaybackArtist {
    name: string;
    uri: string;
}

type ErrorType = (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE];
type IDs = string | string[];
type Layout = 'responsive' | 'compact';
type RepeatState = 'off' | 'context' | 'track';
type Status = (typeof STATUS)[keyof typeof STATUS];
type Type = (typeof TYPE)[keyof typeof TYPE];
interface CallbackState extends State {
    type: Type;
}
interface CustomComponents {
    /**
     * A React component to be displayed before the previous button.
     */
    leftButton?: ReactNode;
    /**
     * A React component to be displayed after the next button.
     */
    rightButton?: ReactNode;
}
interface Props {
    /**
     * Start the player immediately.
     * @default false
     * @deprecated Most browsers block autoplaying since the user needs to interact with the page first.
     */
    autoPlay?: boolean;
    /**
     * Get status updates from the player.
     */
    callback?: (state: CallbackState) => any;
    /**
     * Custom components for the player.
     */
    components?: CustomComponents;
    /**
     * The callback Spotify SDK uses to get/update the token.
     */
    getOAuthToken?: (callback: (token: string) => void) => Promise<void>;
    /**
     * Get the Spotify Web Playback SDK instance.
     */
    getPlayer?: (player: Spotify.Player) => void;
    /**
     * Hide the Spotify logo.
     * More info: https://developer.spotify.com/documentation/general/design-and-branding/
     * @default false
     */
    hideAttribution?: boolean;
    /**
     * Hide the cover art.
     * @default false
     */
    hideCoverArt?: boolean;
    /**
     * The initial volume for the player. This isn't used for external devices.
     * @default 1
     */
    initialVolume?: number;
    /**
     * Show the volume inline for the "responsive" layout for 768px and above.
     * @default true
     */
    inlineVolume?: boolean;
    /**
     * The layout of the player.
     * @default responsive
     */
    layout?: Layout;
    /**
     * The strings used for aria-label/title attributes.
     */
    locale?: Partial<Locale>;
    /**
     * Magnify the player's slider on hover.
     * @default false
     */
    magnifySliderOnHover?: boolean;
    /**
     * The name of the player.
     * @default Spotify Web Player
     */
    name?: string;
    /**
     * The position of the list/tracks you want to start the player.
     */
    offset?: number;
    /**
     * Save the device selection.
     * @default false
     */
    persistDeviceSelection?: boolean;
    /**
     * Control the player's status.
     */
    play?: boolean;
    /**
     * Preload the track data before playing.
     */
    preloadData?: boolean;
    /**
     * Display a Favorite button. It needs additional scopes in your token.
     * @default false
     */
    showSaveIcon?: boolean;
    /**
     * Customize the player's appearance.
     */
    styles?: StylesProps;
    /**
     * If there are no URIs and an external device is playing, use the external player context.
     *  @default false
     */
    syncExternalDevice?: boolean;
    /**
     * The time in seconds that the player will sync with external devices.
     * @default 5
     */
    syncExternalDeviceInterval?: number;
    /**
     * A Spotify token.
     */
    token: string;
    /**
     * Provide you with a function to sync the track saved status in the player.
     * This works in addition to the showSaveIcon prop, and it is only needed if you keep the track's saved status in your app.
     */
    updateSavedStatus?: (fn: (status: boolean) => any) => any;
    /**
     * A list of Spotify URIs.
     */
    uris: string | string[];
}
interface State {
    currentDeviceId: string;
    currentURI: string;
    deviceId: string;
    devices: SpotifyDevice[];
    error: string;
    errorType: ErrorType | null;
    isActive: boolean;
    isInitializing: boolean;
    isMagnified: boolean;
    isPlaying: boolean;
    isSaved: boolean;
    isUnsupported: boolean;
    needsUpdate: boolean;
    nextTracks: SpotifyTrack[];
    playerPosition: 'bottom' | 'top';
    position: number;
    previousTracks: SpotifyTrack[];
    progressMs: number;
    repeat: RepeatState;
    shuffle: boolean;
    status: Status;
    track: SpotifyTrack;
    volume: number;
}
interface ComponentsProps {
    [key: string]: any;
    children?: ReactNode;
    styles: StylesOptions;
}
interface Locale {
    currentDevice: string;
    devices: string;
    next: string;
    otherDevices: string;
    pause: string;
    play: string;
    previous: string;
    removeTrack: string;
    saveTrack: string;
    title: string;
    volume: string;
}
interface PlayOptions {
    context_uri?: string;
    uris?: string[];
}
interface StylesOptions {
    activeColor: string;
    bgColor: string;
    color: string;
    errorColor: string;
    height: number;
    loaderColor: string;
    loaderSize: number | string;
    sliderColor: string;
    sliderHandleBorderRadius: number | string;
    sliderHandleColor: string;
    sliderHeight: number;
    sliderTrackBorderRadius: number | string;
    sliderTrackColor: string;
    trackArtistColor: string;
    trackNameColor: string;
}
type StylesProps = Partial<StylesOptions>;
interface StyledProps {
    [key: string]: any;
    style: Record<string, any>;
}

declare function checkTracksStatus(token: string, tracks: IDs): Promise<boolean[]>;
declare function getAlbumTracks(token: string, id: string): Promise<SpotifyApi.AlbumTracksResponse>;
declare function getArtistTopTracks(token: string, id: string): Promise<SpotifyApi.ArtistsTopTracksResponse>;
declare function getDevices(token: string): Promise<SpotifyApi.UserDevicesResponse>;
declare function getPlaybackState(token: string): Promise<SpotifyApi.CurrentlyPlayingObject | null>;
declare function getPlaylistTracks(token: string, id: string): Promise<SpotifyApi.PlaylistTrackResponse>;
declare function getQueue(token: string): Promise<SpotifyApi.UsersQueueResponse>;
declare function getShow(token: string, id: string): Promise<SpotifyApi.ShowObjectFull>;
declare function getShowEpisodes(token: string, id: string, offset?: number): Promise<SpotifyApi.ShowEpisodesResponse>;
declare function getTrack(token: string, id: string): Promise<SpotifyApi.TrackObjectFull>;
declare function next(token: string, deviceId?: string): Promise<void>;
declare function pause(token: string, deviceId?: string): Promise<void>;
declare function play(token: string, { context_uri, deviceId, offset, uris }: SpotifyPlayOptions): Promise<void>;
declare function previous(token: string, deviceId?: string): Promise<void>;
declare function removeTracks(token: string, tracks: IDs): Promise<void>;
declare function repeat(token: string, state: RepeatState, deviceId?: string): Promise<void>;
declare function saveTracks(token: string, tracks: IDs): Promise<void>;
declare function seek(token: string, position: number, deviceId?: string): Promise<void>;
declare function setDevice(token: string, deviceId: string, shouldPlay?: boolean): Promise<void>;
declare function setVolume(token: string, volume: number, deviceId?: string): Promise<void>;
declare function shuffle(token: string, state: boolean, deviceId?: string): Promise<void>;

declare const spotify_checkTracksStatus: typeof checkTracksStatus;
declare const spotify_getAlbumTracks: typeof getAlbumTracks;
declare const spotify_getArtistTopTracks: typeof getArtistTopTracks;
declare const spotify_getDevices: typeof getDevices;
declare const spotify_getPlaybackState: typeof getPlaybackState;
declare const spotify_getPlaylistTracks: typeof getPlaylistTracks;
declare const spotify_getQueue: typeof getQueue;
declare const spotify_getShow: typeof getShow;
declare const spotify_getShowEpisodes: typeof getShowEpisodes;
declare const spotify_getTrack: typeof getTrack;
declare const spotify_next: typeof next;
declare const spotify_pause: typeof pause;
declare const spotify_play: typeof play;
declare const spotify_previous: typeof previous;
declare const spotify_removeTracks: typeof removeTracks;
declare const spotify_repeat: typeof repeat;
declare const spotify_saveTracks: typeof saveTracks;
declare const spotify_seek: typeof seek;
declare const spotify_setDevice: typeof setDevice;
declare const spotify_setVolume: typeof setVolume;
declare const spotify_shuffle: typeof shuffle;
declare namespace spotify {
  export { spotify_checkTracksStatus as checkTracksStatus, spotify_getAlbumTracks as getAlbumTracks, spotify_getArtistTopTracks as getArtistTopTracks, spotify_getDevices as getDevices, spotify_getPlaybackState as getPlaybackState, spotify_getPlaylistTracks as getPlaylistTracks, spotify_getQueue as getQueue, spotify_getShow as getShow, spotify_getShowEpisodes as getShowEpisodes, spotify_getTrack as getTrack, spotify_next as next, spotify_pause as pause, spotify_play as play, spotify_previous as previous, spotify_removeTracks as removeTracks, spotify_repeat as repeat, spotify_saveTracks as saveTracks, spotify_seek as seek, spotify_setDevice as setDevice, spotify_setVolume as setVolume, spotify_shuffle as shuffle };
}

declare class SpotifyWebPlayer extends PureComponent<Props, State> {
    private isMounted;
    private emptyTrack;
    private locale;
    private player?;
    private playerProgressInterval?;
    private playerSyncInterval?;
    private ref;
    private renderInlineActions;
    private resizeTimeout?;
    private seekUpdateInterval;
    private styles;
    private syncTimeout?;
    private getPlayOptions;
    constructor(props: Props);
    static defaultProps: {
        autoPlay: boolean;
        initialVolume: number;
        magnifySliderOnHover: boolean;
        name: string;
        persistDeviceSelection: boolean;
        showSaveIcon: boolean;
        syncExternalDeviceInterval: number;
        syncExternalDevice: boolean;
    };
    componentDidMount(): Promise<void>;
    componentDidUpdate(previousProps: Props, previousState: State): Promise<void>;
    componentWillUnmount(): Promise<void>;
    private handleCallback;
    private handleChangeRange;
    private handleClickTogglePlay;
    private handleClickPrevious;
    private handleClickNext;
    private handleClickDevice;
    private handleFavoriteStatusChange;
    private handlePlayerErrors;
    private handlePlayerStateChanges;
    private handlePlayerStatus;
    private handleResize;
    private handleToggleMagnify;
    private get token();
    private initializeDevices;
    private initializePlayer;
    private get isExternalPlayer();
    private preload;
    private setExternalDevice;
    private setVolume;
    private syncDevice;
    private toggleSyncInterval;
    private toggleProgressBar;
    private toggleOffset;
    private togglePlay;
    private updateSeekBar;
    private updateState;
    render(): react_jsx_runtime.JSX.Element;
}

type SpotifyPlayer = Spotify.Player;

export { type CallbackState, type ComponentsProps, type CustomComponents, ERROR_TYPE, type ErrorType, type IDs, type Layout, type Locale, type PlayOptions, type Props, type RepeatState, STATUS, type SpotifyAlbum, type SpotifyArtist, type SpotifyDevice, type SpotifyPlayOptions, type SpotifyPlayer, type SpotifyPlayerCallback, type SpotifyTrack, type State, type Status, type StyledProps, type StylesOptions, type StylesProps, TYPE, type Type, type WebPlaybackArtist, SpotifyWebPlayer as default, spotify as spotifyApi };
export = SpotifyWebPlayer