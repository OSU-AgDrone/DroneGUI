from mavsdk.mission import MissionItem, MissionPlan


"""
example output from front end of boundaries:
    example_boundaries = [
        { "lat": 44.56441439616401, "lng": -123.2792677605855 },
        { "lat": 44.564418218107924, "lng": -123.27884397156114 }, 
        {"lat": 44.56422712060508, "lng": -123.27888152248735 }, 
        { "lat": 44.56422329864859, "lng": -123.27925703174944 }, 
        { "lat": 44.56441439616401, "lng": -123.2792677605855 } 
    ]
-> this is a rectangle where the first and last points are the same
"""

def generate_waypoints_from_boundaries(boundaries):
    """
    Generates a list of waypoints from a list of boundary points. Currently generates a basic square wave pattern through area
    inputs:
    - boundaries: list of dictionaries, each containing a lat and lng key

    limitations: 
    - boundaries must currently represent a rectangle (first and last points are the same) len(boundaries) == 5
    """
    DRONE_DIAMETER = 2 # meters ADJUST

    if len(boundaries) != 5:
        raise ValueError("Boundaries must represent a rectangle. len(boundaries) must be 5.")

    y_max = max(boundaries, key=lambda x: x["lat"])["lat"]
    y_min = min(boundaries, key=lambda x: x["lat"])["lat"]
    x_max = max(boundaries, key=lambda x: x["lng"])["lng"]
    x_min = min(boundaries, key=lambda x: x["lng"])["lng"]

    height = y_max - y_min
    width = x_max - x_min

    waypoints = []

    for row in range(0, int(height/DRONE_DIAMETER)):
        # points at and beginning and end of the row, where the waypoint is 1/2 the drone diameter away from the boundary
        waypoints.append({"lat": y_max - row*DRONE_DIAMETER, "lng": x_min + DRONE_DIAMETER/2})
        waypoints.append({"lat": y_max - row*DRONE_DIAMETER, "lng": x_max - DRONE_DIAMETER/2})

    return waypoints

def visualize_waypoints(waypoints, boundaries):
    """
    Visualizes the waypoints and boundaries on a graph. Boundaries in blue, waypoints in red
    inputs:
    - waypoints: list of dictionaries, each containing a lat and lng key
    - boundaries: list of dictionaries, each containing a lat and lng key
    """
    import matplotlib.pyplot as plt

    print("waypoints: ", waypoints)
    print("boundaries: ", boundaries)

    # plot the boundary lines in blue
    for i in range(len(boundaries)-1):
        plt.plot([boundaries[i]["lng"], boundaries[i+1]["lng"]], [boundaries[i]["lat"], boundaries[i+1]["lat"]], 'b')

    # plot the waypoints in red
    for i in range(len(waypoints)):
        plt.plot(waypoints[i]["lng"], waypoints[i]["lat"], 'ro')

    plt.show()


def generate_mission_plan(waypoints, altitude=5, speed=5, is_fly_through=True, loiter_time=float("nan"), vehicle_action=MissionItem.VehicleAction.NONE):
    """
    Generates a mission from the given waypoints and parameters
    inputs:
    - waypoints: list of dictionaries, each containing a lat and lng key
    - altitude: float, the altitude of the mission
    - speed: float, the speed of the mission
    - is_fly_through: boolean, whether the drone should fly through the waypoints
    - loiter_time: float, the time to loiter at each waypoint
    - vehicle_action: MissionItem.VehicleAction, the action to take at each waypoint
    """

    mission_items = []

    for i in range(len(waypoints)):
        mission_items.append(
            MissionItem(
                waypoints[i]["lat"],
                waypoints[i]["lng"],
                altitude,
                speed,
                is_fly_through, 
                float("nan"), 
                float("nan"), 
                MissionItem.CameraAction.NONE, 
                float("nan"), 
                float("nan"), 
                float("nan"), 
                float("nan"), 
                loiter_time, 
                vehicle_action
            )
        )

    return MissionPlan(mission_items)


if __name__ == "__main__":
    example_waypoints = [ # this is the example from mavsdk. should correspond to europe
        {"lat": 47.3980398, "lng": 8.5455725},         
        {"lat": 47.3980362, "lng": 8.54501464}, 
        {"lat": 47.3978256, "lng": 8.54500928}
    ]
    
    example_boundaries = [
        { "lat": 44.56441439616401, "lng": -123.2792677605855 },
        { "lat": 44.564418218107924, "lng": -123.27884397156114 }, 
        {"lat": 44.56422712060508, "lng": -123.27888152248735 }, 
        { "lat": 44.56422329864859, "lng": -123.27925703174944 }, 
        { "lat": 44.56441439616401, "lng": -123.2792677605855 } 
    ]
    waypoints = generate_waypoints_from_boundaries(example_boundaries)
    print("generated waypoints: ", waypoints)
    visualize_waypoints(waypoints, example_boundaries)

    # mission_plan = generate_mission_plan(example_waypoints)
    # print(mission_plan)

