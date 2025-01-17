import { Subject } from '../sub';
import { PlaneDirector } from './directors/PlaneDirector';
import { NavToNavManager } from './managers/NavToNavManager';
import { VNavManager } from './managers/VNavManager';

export enum APVerticalModes {
  NONE,
  PITCH,
  VS,
  FLC,
  ALT,
  PATH,
  GP,
  GS,
  CAP,
  TO,
  GA,
  FPA,
  FLARE
}

export enum APLateralModes {
  NONE,
  ROLL,
  LEVEL,
  GPSS,
  HEADING,
  VOR,
  LOC,
  BC,
  ROLLOUT,
  NAV,
  TO,
  GA,
  HEADING_HOLD,
  TRACK,
  TRACK_HOLD,
}

export enum APAltitudeModes {
  NONE,
  ALTS,
  ALTV
}

/** AP Values Object */
export type APValues = {
  /** The selected altitude, in feet. */
  readonly selectedAltitude: Subject<number>;

  /** The selected vertical speed target, in feet per minute. */
  readonly selectedVerticalSpeed: Subject<number>;

  /** The selected flight path angle target, in degrees */
  readonly selectedFlightPathAngle: Subject<number>;

  /** The selected indicated airspeed target, in knots. */
  readonly selectedIas: Subject<number>;

  /** The selected mach target. */
  readonly selectedMach: Subject<number>;

  /** Whether the selected airspeed target is in mach. */
  readonly isSelectedSpeedInMach: Subject<boolean>;

  /** The selected pitch target, in degrees. */
  readonly selectedPitch: Subject<number>;

  /** The maximum bank setting ID. */
  readonly maxBankId: Subject<number>;

  /** The maximum Bank Angle the autopilot may command in absolute degrees. */
  readonly maxBankAngle: Subject<number>;

  /** The selected heading, in degrees. */
  readonly selectedHeading: Subject<number>;

  /** The captured altitude, in feet. */
  readonly capturedAltitude: Subject<number>;

  /** Approach is Activated in Flight Plan */
  readonly approachIsActive: Subject<boolean>;

  /** The activated approach has an LPV GP */
  readonly approachHasGP: Subject<boolean>;

  /** The Nav 1 Radio is tuned to an ILS with a GS signal */
  readonly nav1HasGs: Subject<boolean>;

  /** The Nav 2 Radio is tuned to an ILS with a GS signal */
  readonly nav2HasGs: Subject<boolean>;

  /** The Nav 3 Radio is tuned to an ILS with a GS signal */
  readonly nav3HasGs: Subject<boolean>;

  /** The Nav 4 Radio is tuned to an ILS with a GS signal */
  readonly nav4HasGs: Subject<boolean>;

  /** The Active Lateral Mode */
  readonly lateralActive: Subject<APLateralModes>;

  /** The Active Vertical Mode */
  readonly verticalActive: Subject<APVerticalModes>;

  /** The Armed Lateral Mode */
  readonly lateralArmed: Subject<APLateralModes>;

  /** The Armed Vertical Mode */
  readonly verticalArmed: Subject<APVerticalModes>;

  /** The AP Approach Mode is on */
  readonly apApproachModeOn: Subject<boolean>;

  /** Returns whether nav to nav says that LOC can be armed. */
  navToNavLocArm?: () => boolean;
}

/**
 * An autopilot configuration.
 */
export interface APConfig {

  /**
   * Creates the autopilot's VNAV Manager.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's VNAV Manager.
   */
  createVNavManager(apValues: APValues): VNavManager | undefined;

  /**
   * Creates the autopilot's nav-to-nav manager.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's nav-to-nav manager.
   */
  createNavToNavManager(apValues: APValues): NavToNavManager | undefined;

  /**
   * Creates the autopilot's variable bank manager.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's variable bank manager.
   */
  createVariableBankManager(apValues: APValues): Record<any, any> | undefined;

  /**
   * Creates the autopilot's VNAV Path mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's VNAV Path mode director.
   */
  createVNavPathDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's heading mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's heading mode director.
   */
  createHeadingDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's heading hold (level off and then capture heading)
   * @param apValues The autopilot's state values.
   * @returns The autopilot's heading hold director.
   */
  createHeadingHoldDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's track mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's heading mode director.
   */
  createTrackDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's track hold (level off and then capture track)
   * @param apValues The autopilot's state values.
   * @returns The autopilot's heading hold director.
   */
  createTrackHoldDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's roll mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's heading mode director.
   */
  createRollDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's wings level mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's wings level mode director.
   */
  createWingLevelerDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's GPS LNAV mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's GPS LNAV mode director.
   */
  createGpssDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's VOR mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's VOR mode director.
   */
  createVorDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's LOC mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's LOC mode director.
   */
  createLocDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's back-course mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's back-course mode director.
   */
  createBcDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's ROLLOUT mode director.
   * @returns The autopilot's ROLLOUT mode director.
   */
  createRolloutDirector(): PlaneDirector | undefined;

  /**
   * Creates the autopilot's pitch mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's pitch mode director.
   */
  createPitchDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's vertical speed mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's vertical speed mode director.
   */
  createVsDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's flight path angle mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's flight path angle mode director.
   */
  createFpaDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's flight level change mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's flight level change mode director.
   */
  createFlcDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's altitude hold mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's altitude hold mode director.
   */
  createAltHoldDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's altitude capture mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's altitude capture mode director.
   */
  createAltCapDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's GPS glidepath mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's GPS glidepath mode director.
   */
  createGpDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's ILS glideslope mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's ILS glideslope mode director.
   */
  createGsDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the auto land FLARE mode director.
   * @param apValues The autopilot's state values.
   * @returns The autopilot's FLARE mode director.
   */
  createFlareDirector(): PlaneDirector | undefined;

  /**
   * Creates the autopilot's vertical takeoff mode director (or combined vertical takeoff/go-around mode director).
   * @returns The autopilot's vertical takeoff mode director.
   */
  createToVerticalDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's vertical go-around mode director.
   * @returns The autopilot's vertical go-around mode director.
   */
  createGaVerticalDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's lateral takeoff mode director (or combined lateral takeoff/go-around mode director).
   * @returns The autopilot's lateral takeoff mode director.
   */
  createToLateralDirector(apValues: APValues): PlaneDirector | undefined;

  /**
   * Creates the autopilot's lateral go-around mode director.
   * @returns The autopilot's lateral go-around mode director.
   */
  createGaLateralDirector(apValues: APValues): PlaneDirector | undefined;

  /** The autopilot's default lateral mode. */
  defaultLateralMode: APLateralModes | (() => APLateralModes);

  /** The autopilot's default vertical mode. */
  defaultVerticalMode: APVerticalModes | (() => APVerticalModes);

  /** The default maximum bank angle the autopilot may command in degrees. */
  defaultMaxBankAngle: number;

  /** The altitude hold slot index to use. Defaults to 1 */
  altitudeHoldSlotIndex?: 1 | 2 | 3;

  /** The default altitude hold value set during init, defaults to 0 */
  altitudeHoldDefaultAltitude?: number;

  /** The heading hold slot index to use. Defaults to 1 */
  headingHoldSlotIndex?: 1 | 2 | 3;
}