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

def lat_lng_to_xy(lat, lng):
    """
    Converts latitude and longitude to x and y coordinates. Uses Equirectangular projection to approximate the values.
    inputs:
    - lat: float, the latitude
    - lng: float, the longitude
    returns:
    - x: float, the x coordinate (in meters)
    - y: float, the y coordinate (in meters)
    """

    R = 6371000 # radius of the earth in meters
    x = R * lng * 3.14159 / 180 # may need to adjust this formula
    y = R * lat * 3.14159 / 180
    return {"x": x, "y": y}

def generate_waypoints_from_boundaries(boundaries):
    """
    Generates a list of waypoints from a list of boundary points. Currently generates a basic square wave pattern through area
    inputs:
    - boundaries: list of dictionaries, each containing a x and y key

    limitations: 
    - boundaries must currently represent a rectangle (first and last points are the same) len(boundaries) == 5
    """
    DRONE_DIAMETER = 2 # meters ADJUST

    if len(boundaries) != 5:
        raise ValueError("Boundaries must represent a rectangle. len(boundaries) must be 5.")

    y_max = max(boundaries, key=lambda x: x["y"])["y"]
    y_min = min(boundaries, key=lambda x: x["y"])["y"]
    x_max = max(boundaries, key=lambda x: x["x"])["x"]
    x_min = min(boundaries, key=lambda x: x["x"])["x"]

    height = y_max - y_min
    width = x_max - x_min
    print("height: ", height)

    num_paths = height // DRONE_DIAMETER

    waypoints = []
    left_waypoints = []
    right_waypoints = []

    # add starting point
    left_waypoints.append({"y": y_min, "x": x_min})

    # (xmin, ymin+ a/2D), (xmin, ymin+ 3a/2D), (xmin, ymin+ 5a/2D), etc
    print ("num_paths: ", num_paths)
    odd_num = 1
    for i in range(int(num_paths)):
        # add left waypoints
        left_waypoints.append({"y": y_min + (odd_num*height)/(2 * num_paths), "x": x_min})
        right_waypoints.append({"y": y_min + (odd_num*height)/(2 * num_paths), "x": x_max})
        odd_num += 2
    
    # add ending point
    right_waypoints.append({"y": y_max, "x": x_max})

    print("left waypoints: ", left_waypoints)
    print("right waypoints: ", right_waypoints)

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
    - waypoints: list of dictionaries, each containing a y and x key
    - boundaries: list of dictionaries, each containing a y and x key
    """
    print("waypoints: ", waypoints)
    print("boundaries: ", boundaries)

    # Extract y and x for boundaries
    boundary_ys = [point["y"] for point in boundaries]
    boundary_xs = [point["x"] for point in boundaries]

    # Extract y and x for waypoints
    waypoint_ys = [point["y"] for point in waypoints]
    waypoint_xs = [point["x"] for point in waypoints]

    # Plot the boundary lines in blue
    plt.plot(boundary_xs, boundary_ys, 'b')

    # Plot the waypoints in red
    plt.plot(waypoint_xs, waypoint_ys, 'ro')

    # Plot a path connecting the waypoints
    for i in range(len(waypoints) - 1):
        plt.plot([waypoint_xs[i], waypoint_xs[i + 1]], [waypoint_ys[i], waypoint_ys[i + 1]], 'r--')

    plt.xlabel('x Longitude')
    plt.ylabel('y Latitude')
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

    # points = [lat_lng_to_xy(point["lat"], point["lng"]) for point in example_boundaries]
    # for point in example_boundaries:
    #     x, y = lat_lng_to_xy(point["lat"], point["lng"])
    #     print("x: ", x, "y: ", y, "point: ", point)

    # # plot points
    # x = [point[0] for point in points]
    # y = [point[1] for point in points]

    # plt.plot(x, y)
    # plt.show()
    converted_boundaries = [lat_lng_to_xy(point["lat"], point["lng"]) for point in example_boundaries]
    print("converted boundaries: ", converted_boundaries)
    print("y max: ", max(converted_boundaries, key=lambda x: x["y"])["y"])
    print("y min: ", min(converted_boundaries, key=lambda x: x["y"])["y"])
    print("x max: ", max(converted_boundaries, key=lambda x: x["x"])["x"])
    print("x min: ", min(converted_boundaries, key=lambda x: x["x"])["x"])
    waypoints = generate_waypoints_from_boundaries(converted_boundaries)
    # print("generated waypoints: ", waypoints)
    print("y_waypoint_max: ", max(waypoints, key=lambda x: x["y"])["y"])
    print("y_waypoint_min: ", min(waypoints, key=lambda x: x["y"])["y"])
    print("x_waypoint_max: ", max(waypoints, key=lambda x: x["x"])["x"])
    print("x_waypoint_min: ", min(waypoints, key=lambda x: x["x"])["x"])
    visualize_waypoints(waypoints, converted_boundaries)

    #print the y difference between the first and second waypoint, and the third and fourth waypoint
    print("y difference between first and second waypoint: ", waypoints[1]["y"] - waypoints[0]["y"])
    print("y difference between third and fourth waypoint: ", waypoints[3]["y"] - waypoints[2]["y"])

    # mission_plan = generate_mission_plan(example_waypoints)
    # print(mission_plan)

