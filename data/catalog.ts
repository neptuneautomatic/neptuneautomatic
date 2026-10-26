export interface CatalogItem {
  title: string;
  category: string;
  targetId: string;
  tabKey?: string;
  desc: string;
  keywords: string;
}

export const CATALOG_ITEMS: CatalogItem[] = [
  // Access Automation
  {
    title: 'Automatic Boom Barrier',
    category: 'Access Automation',
    targetId: '#solutions',
    tabKey: 'automation',
    desc: 'High-speed electromechanical & hydraulic barrier gates with brushless DC motors, 100% duty cycle, and 0.9s opening.',
    keywords: 'boom barrier automatic barrier gate toll gate parking barrier faac bldc high speed'
  },
  {
    title: 'High Security Automatic Bollards',
    category: 'Access Automation',
    targetId: '#solutions',
    tabKey: 'automation',
    desc: 'Crash-rated retractable hydraulic bollards engineered for anti-ram defense and hostile vehicle mitigation.',
    keywords: 'bollard hydraulic bollard crash rated bollard security bollard astm m30 m50 pas68'
  },
  {
    title: 'Crash Rated Drop Arm Barrier',
    category: 'Access Automation',
    targetId: '#solutions',
    tabKey: 'automation',
    desc: 'Heavy-duty crash beam engineered to halt heavy commercial trucks attempting unauthorized facility breach.',
    keywords: 'drop arm crash barrier crash beam anti ram barrier defense'
  },
  {
    title: 'Strong Arm Automatic Barrier',
    category: 'Access Automation',
    targetId: '#solutions',
    tabKey: 'automation',
    desc: 'Vandal-resistant articulated and rigid arm barrier designed for high-wind exposed toll highways and industrial zones.',
    keywords: 'strong arm heavy barrier articulated barrier toll plaza wind resistant'
  },
  {
    title: 'Swing Gate Automation',
    category: 'Access Automation',
    targetId: '#solutions',
    tabKey: 'automation',
    desc: 'Electromechanical and underground hydraulic swing gate operators for architectural residential and industrial gates.',
    keywords: 'swing gate underground motor hydraulic swing linear actuator gate motor'
  },
  {
    title: 'Sliding Gate Automation',
    category: 'Access Automation',
    targetId: '#solutions',
    tabKey: 'automation',
    desc: 'High-torque motorized gearboxes for cantilever and track sliding gates up to 4000kg with 24/7 continuous duty.',
    keywords: 'sliding gate cantilever rack pinion motor heavy industrial track gate'
  },
  {
    title: 'Automatic Rolling Shutters',
    category: 'Access Automation',
    targetId: '#solutions',
    tabKey: 'automation',
    desc: 'Motorized industrial roll-up doors, high-speed shutters, and insulated sectional doors for warehouses and hangars.',
    keywords: 'rolling shutter motorized shutter industrial roll-up door sectional hangar warehouse'
  },

  // Access Control
  {
    title: 'UHF Reader - RFID Long Range',
    category: 'Access Control',
    targetId: '#solutions',
    tabKey: 'control',
    desc: 'Hands-free ultra-high frequency RFID vehicle identification reader with up to 12-meter detection distance.',
    keywords: 'uhf reader rfid long range handsfree windshield tag fastag electronic toll'
  },
  {
    title: 'Smart Card Readers',
    category: 'Access Control',
    targetId: '#solutions',
    tabKey: 'control',
    desc: 'Multi-technology contactless Mifare, DESFire, and HID card readers with Wiegand and OSDP protocols.',
    keywords: 'smart card reader mifare rfid credential wiegand osdp contactless'
  },
  {
    title: 'Pedestrian Access Gates',
    category: 'Access Control',
    targetId: '#solutions',
    tabKey: 'control',
    desc: 'Optical speed gates, motorized swing flap barriers, and tripod turnstiles designed for high-throughput architectural lobbies.',
    keywords: 'pedestrian turnstile speed gate flap barrier lobby optical turnstile transit'
  },
  {
    title: 'Vehicular Access Control',
    category: 'Access Control',
    targetId: '#solutions',
    tabKey: 'control',
    desc: 'Automated vehicle access systems integrating ANPR cameras, loop logic, and multi-channel access controller boards.',
    keywords: 'vehicular access control anpr license plate camera barrier controller logic'
  },

  // Accessories
  {
    title: 'Safety Devices',
    category: 'Accessories',
    targetId: '#solutions',
    tabKey: 'accessories',
    desc: 'Infrared anti-crush safety photocell beams, inductive ground vehicle loops, and responsive pneumatic rubber safety edges.',
    keywords: 'safety photocell infrared sensor loop detector anti crush edge safety beam'
  },
  {
    title: 'Simple Pulse Generator',
    category: 'Accessories',
    targetId: '#solutions',
    tabKey: 'accessories',
    desc: 'Commercial momentary push buttons, stainless steel desk switches, and key-operated manual override selectors.',
    keywords: 'push button manual switch pulse generator key switch barrier button'
  },
  {
    title: 'Electronic Pulse Generator',
    category: 'Accessories',
    targetId: '#solutions',
    tabKey: 'accessories',
    desc: 'Programmable electronic timer relays, pulse sequencers, and synchronization logic units for gate operations.',
    keywords: 'electronic pulse generator timer relay sequencer gate synchronization logic'
  },
  {
    title: 'Gate Locks',
    category: 'Accessories',
    targetId: '#solutions',
    tabKey: 'accessories',
    desc: 'High-holding-force weatherproof electromagnetic sheer locks and fail-safe/fail-secure electric strikes for automatic gates.',
    keywords: 'gate lock electro magnetic lock maglock electric strike holding force'
  },
  {
    title: 'Traffic Lights',
    category: 'Accessories',
    targetId: '#solutions',
    tabKey: 'accessories',
    desc: '100mm and 200mm red/green dual LED directional signaling lamps with sun hoods and IP65 weatherproof housings.',
    keywords: 'traffic light red green led signal indicator barrier lamp lane control'
  },
  {
    title: 'Miscellaneous Accessories',
    category: 'Accessories',
    targetId: '#solutions',
    tabKey: 'accessories',
    desc: 'Industrial DIN-rail power supplies, foundation anchors, articulated boom arm joints, and flashing LED beacons.',
    keywords: 'miscellaneous accessories beacon bracket power supply din rail boom joint'
  },

  // Parking Solutions
  {
    title: 'Parking Management Solutions',
    category: 'Parking',
    targetId: '#solutions',
    tabKey: 'parking',
    desc: 'Integrated parking hardware and software supporting automated barcode ticketing, FASTag RFID, and cashless payment kiosks.',
    keywords: 'parking management pms ticketing fastag automated revenue cashier kiosk'
  },
  {
    title: 'Parking Guidance Solutions',
    category: 'Parking',
    targetId: '#solutions',
    tabKey: 'parking',
    desc: 'Intelligent ultrasonic and camera-based space detection with LED slot vacancy lights and digital wayfinding signs.',
    keywords: 'parking guidance pgs ultrasonic sensor slot indicator wayfinding vms display'
  },
  {
    title: 'Parking Counting Solutions',
    category: 'Parking',
    targetId: '#solutions',
    tabKey: 'parking',
    desc: 'Real-time multi-deck vehicle occupancy counting using bidirectional inductive loops and laser counting radar.',
    keywords: 'parking counting vehicle counter occupancy display deck capacity loop counter'
  },
  {
    title: 'Vehicular Access Control Solutions',
    category: 'Parking',
    targetId: '#solutions',
    tabKey: 'parking',
    desc: 'Smart community and corporate tech park vehicle access with automated whitelist ANPR and mobile visitor gate pass.',
    keywords: 'vehicular parking access corporate tech park visitor management anpr whitelist'
  }
];
