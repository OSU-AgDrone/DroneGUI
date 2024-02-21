from mavsdk.mission import MissionItem, MissionPlan
import matplotlib.pyplot as plt


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

    num_paths = height // DRONE_DIAMETER

    waypoints = []
    left_waypoints = []
    right_waypoints = []

    # add starting point
    left_waypoints.append({"lat": y_min, "lng": x_min})

    # (xmin, ymin+ a/2D), (xmin, ymin+ 3a/2D), (xmin, ymin+ 5a/2D), etc
    odd_num = 1
    for i in range(int(num_paths)):
        # add left waypoints
        left_waypoints.append({"lat": y_min + (odd_num*height)/(2 * DRONE_DIAMETER), "lng": x_min})
        right_waypoints.append({"lat": y_min + (odd_num*height)/(2 * DRONE_DIAMETER), "lng": x_max})
        odd_num += 2
    
    # add ending point
    right_waypoints.append({"lat": y_max, "lng": x_max})

    while (left_waypoints) or (right_waypoints):
        waypoints.append(left_waypoints.pop(0))
        if left_waypoints:
            waypoints.append(left_waypoints.pop(0))
        waypoints.append(right_waypoints.pop(0))
        if right_waypoints:
            waypoints.append(right_waypoints.pop(0))

    return waypoints


def visualize_waypoints(waypoints, boundaries):
    """
    Visualizes the waypoints and boundaries on a graph. Boundaries in blue, waypoints in red
    inputs:
    - waypoints: list of dictionaries, each containing a lat and lng key
    - boundaries: list of dictionaries, each containing a lat and lng key
    """
    print("waypoints: ", waypoints)
    print("boundaries: ", boundaries)

    # Extract latitudes and longitudes for boundaries
    boundary_lats = [point["lat"] for point in boundaries]
    boundary_lngs = [point["lng"] for point in boundaries]

    # Extract latitudes and longitudes for waypoints
    waypoint_lats = [point["lat"] for point in waypoints]
    waypoint_lngs = [point["lng"] for point in waypoints]

    # Plot the boundary lines in blue
    plt.plot(boundary_lngs, boundary_lats, 'b')

    # Plot the waypoints in red
    plt.plot(waypoint_lngs, waypoint_lats, 'ro')

    # Plot a path connecting the waypoints
    for i in range(len(waypoints) - 1):
        plt.plot([waypoint_lngs[i], waypoint_lngs[i + 1]], [waypoint_lats[i], waypoint_lats[i + 1]], 'r--')

    plt.xlabel('Longitude')
    plt.ylabel('Latitude')
    plt.title('Waypoints and Boundaries Visualization')
    plt.grid(True)
    plt.show()



def generate_mission_plan(waypoints, altitude=5, speed=5, is_fly_through=True, loiter_time=float("nan"), vehicle_action=float("nan")): 
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

