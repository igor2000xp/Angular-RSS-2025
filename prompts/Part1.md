Purpose and Goals:

- Act as an expert Human Resources specialist.
- Assist a Project Manager in drafting a compelling recommendation for a Front-end developer.
- Ensure the recommendation highlights the developer's key strengths and suitability for continued involvement and potential leadership.

Behaviors and Rules:

1. Initial Interaction:
   a) Acknowledge the user's role as a Project Manager on an IT project with Angular.
   b) Confirm understanding of the request: to draft a strong recommendation for a Front-end developer based on the provided information.

2. Recommendation Drafting:
   a) Structure the recommendation clearly, starting with a strong opening statement.
   b) Incorporate all provided key points: 'Code Quality', 'Scalability', 'Professional Standards', 'Domain Expertise', and 'Technical Proficiency'.
   c) Elaborate on each point using the detailed descriptions provided (e.g., 'Clean, maintainable code structure with proper documentation' for Code Quality).
   d) Emphasize the developer's 'strong technical capabilities', 'architectural thinking', and 'domain knowledge'.
   e) Highlight that 'The codebase reflects professional development practices and shows the ability to handle complex enterprise applications'.
   f) Conclude with a strong endorsement for 'continued project involvement and potential leadership roles in frontend development'.
   g) Maintain a professional, articulate, and persuasive tone throughout the recommendation.
   h) Present the recommendation as a formal, ready-to-use document.

3. Language and Tone:
   a) Use formal and professional language suitable for a HR recommendation.
   b) Be objective and focused on the developer's contributions and capabilities.
   c) Avoid jargon where simpler, clear language can be used, but retain technical terms where appropriate for the context.

Overall Tone:

- Professional, knowledgeable, and articulate.
- Confident and authoritative in HR best practices.
- Helpful and supportive to the Project Manager's request.

## I would like to create an application <Smart Home UI>. Give me a plan to create it.

#### Overview of the application.

<Smart Home UI> is an application for monitoring and controlling smart devices within a home environment. It offers a structured and interactive layout that allows users to:

- Monitor temperature, humidity, weather conditions, electricity usage, and other sensor data
- Control lights, sockets, relays, and switches
- View a unified dashboard composed of device and sensor cards grouped by rooms or functional areas

The interface adapts to various room configurations and device combinations, providing a flexible and user-friendly experience. The view of the interface is in the attachments.

- Use mock data <from mock-data.json file> to define the initial dashboard content.

Based on this data:

- Create interfaces/models for card types, devices, and sensors

Based on the models, plan the structure of components, including separate components for the list of cards and individual card rendering.
You may use any <Angular Material> framework or library.

#### Components structure

You should implement a modular and reusable component structure that includes:

- Sidebar – static on desktop, collapsible on smaller screens
- Sidebar header
- Sidebar menu (contains at least a "Dashboard" section)
- Sidebar footer with placeholder layout for login/avatar (no logic required in this task)
- Dashboard – displays the main content area
- Tab switcher – switches between sections of the dashboard (e.g., Overview, Lights)
- Card list – renders a collection of cards
- Card – renders a single card and its contents
- Device – reusable component for all controllable devices
- Sensor – reusable component for all read-only sensors

#### Functional requirements

- The dashboard displays a list of cards, each representing a group of devices and/or sensors.
- The data now comes as mock data defined directly within the application code. In the next task in the series, the data will be retrieved from a backend.
- Each card should reflect the structure and entities defined in the data.
- Card data includes a layout type that defines how its content should be displayed (e.g., single, horizontal, vertical).

#### Card types

- Single-device card
- Compact layout for a single device or sensor
- For controllable devices, the icon acts as a toggle — no separate switch is shown
- Multi-device card — horizontal layout.
  Devices or sensors are stacked vertically
- Multi-device card — vertical layout
  Devices or sensors are stacked vertically

Each card includes:

- A title (e.g., room name or zone)
- A list of devices and/or sensors
- (If applicable) a group toggle for all controllable devices

The toggle appears when the card includes two or more controllable devices, even if it also contains sensors
Group toggle logic is if a card contains two or more controllable devices, a group toggle should be shown. The toggle is considered:

- ON if at least one device is on
- OFF if all devices are off
  Toggling the group switch should set all device states accordingly.
  This logic can be implemented as part of the card component.

#### Device and Sensor components

##### Controllable device

- Controllable devices may include <lights, sockets, relays, wall switches>, etc.
- The device component should receive a data object like:

```
{
  icon: string;
  label: string;
  state: boolean;
}
```

- In single-device cards, the icon acts as a toggle
- In multi-device cards, use a switch element to control device state
- The icon should visually reflect the device’s current state (ON/OFF)
- You need to use icons from Angular Material or any other icon set

##### Sensor

Sensors provide read-only values such as:

- Weather: temperature, humidity, forecast
- Electricity: voltage, current, power
  A reusable sensor component should receive a data object like:

```
{
  icon: string;
  label: string;
  value: {
    amount: number;
    unit: string;
  }
}
```

implement a custom pipe to convert sensor values into a readable string (e.g., 220 W, 75 %).

#### Custom Directives

implement at least one custom directive.

use cases include:

- Highlighting a controllable device when its state is ON (e.g., change color, glow, etc.)
- Highlighting an entire card when at least one device in it is active

#### Custom Pipes

implement at least one custom pipe to:

- Format sensor values from objects into readable strings (e.g., { amount: 220, unit: 'W' } → 220 W)
  Additional custom pipes are encouraged but optional. It may include transforming device labels or state indicators.
