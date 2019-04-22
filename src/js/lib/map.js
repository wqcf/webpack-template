import Cesium from 'cesium/Cesium';
class MapControl {
    constructor(conid, showAnimate = true, showTimeline = true) {
        this.conid = conid;
        this.viewer = this._initViewer(showAnimate, showTimeline);
        this.camera = this.viewer.camera;
        this.scene = this.viewer.scene;
        this.ellipsoid = this.scene.globe.ellipsoid;
    }

    _initViewer(showAnimate, showTimeline) {
        let viewer = new Cesium.Viewer(this.conid, {
            shadows: false,
            animation: showAnimate,
            baseLayerPicker: false,
            fullscreenButton: false,
            vrButton: false,
            geocoder: false,
            homeButton: false,
            //skyBox: true,
            infoBox: false,
            sceneModePicker: false,
            selectionIndicator: false,
            timeline: showTimeline,
            navigationHelpButton: false,
            skyAtmosphere: false,
            showRenderLoopErrors: true,
            /* imageryProvider: Cesium.createTileMapServiceImageryProvider({

                url: '/qd/map/tiles/',

                // url : '/qd/map/tiles',

                fileExtension: 'png',
                brightness: 0
            }) */
            imageryProvider: Cesium.createOpenStreetMapImageryProvider({
                url : 'https://a.tile.openstreetmap.org/'
            })
        });

        viewer.clock.shouldAnimate = true;
        viewer.resolutionScale = 0.95;

        return viewer;
    }

    bindRender(callback) {
        let old = null;
        this.viewer.scene.preRender.addEventListener((scene, time) => {
            if (old == null) {
                old = time.secondsOfDay;
            } else if (Math.abs(time.secondsOfDay - old) >= (50 / 1000)) {
                callback(time);
                old = time.secondsOfDay;
            }
        });
    }

    bindRenderOneSecond(callback) {
        let old = null;
        this.viewer.scene.preRender.addEventListener((scene, time) => {
            if (old == null) {
                old = time.secondsOfDay;
            } else if (Math.abs(time.secondsOfDay - old) >= (1000 / 1000)) {
                callback(time);
                //1s 1ci
                //
                old = time.secondsOfDay;
            }
        });
    }

    setView(view) {
        this.viewer.camera.setView({
            destination: view.pos,
            orientation: {
                direction: view.dir,
                up: view.up
            }
        });
    }

    FlyGoTo(pos, dir, up, callback) {
        this.viewer.camera.flyTo({
            destination: new Cesium.Cartesian3(pos[0], pos[1], pos[2]),
            orientation: {
                direction: new Cesium.Cartesian3(dir[0], dir[1], dir[2]),
                up: new Cesium.Cartesian3(up[0], up[1], up[2])
            },
            complete: callback
        });
    };

    GoMain() {
        this.FlyGoTo([-8568920.391617496, 22426323.407538284, 17307376.42274922], [0.2892782881428456, -0.7572128830207231, -0.5856165313552799], [0.32869428437945714, -0.4960018568429742, 0.8037053100637064], () => {
            this.FlyGoTo([-2623630.9524072222, 4486747.215800505, 3755766.4537351686], [0.40794639603091326, -0.6978990755532716, -0.5886566217305963], [0.40285645501612327, -0.4409933773819375, 0.8020171555254378], () => { });
        });
    };
}

export default MapControl;