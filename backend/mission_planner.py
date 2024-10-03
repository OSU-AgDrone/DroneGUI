from mavsdk.mission import MissionItem, MissionPlan
import matplotlib.pyplot as plt
import json
from matplotlib.path import Path
import numpy as np


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
    Converts latitude and longitude to x and y coordinates. 
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

def xy_to_ll(x, y):
    """
    Converts x and y coordinates to latitude and longitude. 
    inputs:
    - x: float, the x coordinate (in meters)
    - y: float, the y coordinate (in meters)
    returns:
    - lat: float, the latitude
    - lng: float, the longitude
    """
    R = 6371000 # radius of the earth in meters
    lat = y / R * 180 / 3.14159
    lng = x / R * 180 / 3.14159
    return {"lat": lat, "lng": lng}

def generate_occupancy_grid(boundaries,obstacles = [], resolution=1):
    """
    Generates an occupancy grid from the given boundaries and resolution
    inputs:
    - boundaries: list of dictionaries, each containing a x and y key. represents a polygon.
    - obstacles: list of dictionaries, each containing a x and y key
    - resolution: float, the resolution of the occupancy grid
    returns:
    - occupancy_grid: 2D list of booleans, the occupancy grid
    """

    # get the min and max x and y values
    x_min = min(boundaries, key=lambda x: x["x"])["x"]
    x_max = max(boundaries, key=lambda x: x["x"])["x"]
    y_min = min(boundaries, key=lambda x: x["y"])["y"]
    y_max = max(boundaries, key=lambda x: x["y"])["y"]

    # calculate the number of cells in the x and y directions
    num_x_cells = int((x_max - x_min) / resolution)
    num_y_cells = int((y_max - y_min) / resolution)

    # create the occupancy grid
    occupancy_grid = [[False for _ in range(num_x_cells)] for _ in range(num_y_cells)]

    # create a path object from the boundaries
    boundary_path = Path([(point["x"], point["y"]) for point in boundaries])

    # iterate through each cell in the occupancy grid
    for i in range(num_x_cells):
        for j in range(num_y_cells):
            # calculate the x and y coordinates of the cell
            x = x_min + i * resolution
            y = y_min + j * resolution

            # check if the cell is within the boundaries
            if boundary_path.contains_point((x, y)):
                occupancy_grid[j][i] = True

    return occupancy_grid


def visualize_occupancy_grid(occupancy_grid):
    """
    Visualizes the occupancy grid on a graph. Occupied cells in black, unoccupied cells in white.
    inputs:
    - occupancy_grid: 2D list of booleans, the occupancy grid
    """
    plt.imshow(occupancy_grid, cmap="binary")
    plt.xlabel("x")
    plt.ylabel("y")
    plt.title("Occupancy Grid Visualization")
    plt.grid(True)
    plt.show()

def get_x_coordinate(y, x1, y1, slope):
    """ 
    Helper function for generate_waypoints_from_boundaries. 
    Returns the x coordinate given a y coordinate and a slope.
    """
    return x1 + (y - y1) / slope

def generate_waypoints_from_boundaries(boundaries):
    """
    Generates a list of waypoints from a list of boundary points. Currently generates a basic square wave pattern 
    through area defined by boundaries.
    inputs:
    - boundaries: list of dictionaries, each containing a x and y key

    limitations: 
    - boundaries must currently represent a rectangle (first and last points are the same) len(boundaries) == 5
    """
    DRONE_DIAMETER = 2  # meters ADJUST

    if len(boundaries) != 5:
        raise ValueError("Boundaries must represent a rectangle. len(boundaries) must be 5.")
    
    # Get the two minimum x left boundary points
    x_left_1 = min(boundaries, key=lambda x: x["x"])["x"]
    y_left_1 = min(boundaries, key=lambda x: x["x"])["y"]
    
    # Find the next smallest x-value that is greater than x_left_1
    next_smallest_x_left = min(boundary["x"] for boundary in boundaries if boundary["x"] != x_left_1)
    x_left_2 = next_smallest_x_left
    y_left_2 = next(boundary["y"] for boundary in boundaries if boundary["x"] == next_smallest_x_left)
   
    left_boundary_slope = (y_left_2 - y_left_1) / (x_left_2 - x_left_1)

    # Get the two maximum x right boundary points
    x_right_1 = max(boundaries, key=lambda x: x["x"])["x"]
    y_right_1 = max(boundaries, key=lambda x: x["x"])["y"]
    
    # Find the next largest x-value that is less than x_right_1
    next_largest_x_right = max(boundary["x"] for boundary in boundaries if boundary["x"] != x_right_1)
    x_right_2 = next_largest_x_right
    y_right_2 = next(boundary["y"] for boundary in boundaries if boundary["x"] == next_largest_x_right)

    right_boundary_slope = (y_right_2 - y_right_1) / (x_right_2 - x_right_1)

    # y values for spacing of flight rows
    y_max = max(boundaries, key=lambda x: x["y"])["y"]
    y_min = min(boundaries, key=lambda x: x["y"])["y"]
    height = y_max - y_min
    num_paths = height // DRONE_DIAMETER # p

    waypoints = []
    left_waypoints = []
    right_waypoints = []

    # add starting point
    left_waypoints.append({"y": y_min, "x": get_x_coordinate(y_min, x_left_1, y_left_1, left_boundary_slope)})

    # (xmin, ymin+ a/2D), (xmin, ymin+ 3a/2p), (xmin, ymin+ 5a/2p), etc
    odd_num = 1
    for i in range(int(num_paths)):
        y_coordinate = y_min + (odd_num*height)/(2 * num_paths)

        # add waypoints
        left_waypoints.append({"y": y_coordinate, "x": get_x_coordinate(y_coordinate, x_left_1, y_left_1, left_boundary_slope)})
        right_waypoints.append({"y": y_coordinate, "x": get_x_coordinate(y_coordinate, x_right_1, y_right_1, right_boundary_slope)})
        odd_num += 2
    
    # add ending point
    right_waypoints.append({"y": y_max, "x": get_x_coordinate(y_max, x_right_1, y_right_1, right_boundary_slope)})

    # combine left and right waypoints
    while (left_waypoints) or (right_waypoints):
        waypoints.append(left_waypoints.pop(0))
        if left_waypoints:
            waypoints.append(left_waypoints.pop(0))
        waypoints.append(right_waypoints.pop(0))
        if right_waypoints:
            waypoints.append(right_waypoints.pop(0))
    
    return waypoints

def visualize_waypoints_xy(waypoints, boundaries):
    """
    Visualizes the waypoints and boundaries on a graph. Boundaries in blue, waypoints in red
    inputs:
    - waypoints: list of dictionaries, each containing a y and x key
    - boundaries: list of dictionaries, each containing a y and x key
    """

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

    plt.xlabel('x')
    plt.ylabel('y')
    plt.title('Waypoints and Boundaries Visualization')
    plt.grid(True)
    plt.show()

def visualize_waypoints_ll(waypoints, boundaries):
    """
    Visualizes the waypoints and boundaries on a graph. Boundaries in blue, waypoints in red
    inputs:
    - waypoints: list of dictionaries, each containing a lat and lng key
    - boundaries: list of dictionaries, each containing a lat and lng key
    """
    # Extract lat and lng for boundaries
    boundary_lats = [point["lat"] for point in boundaries]
    boundary_lngs = [point["lng"] for point in boundaries]

    # Extract lat and lng for waypoints
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


def generate_mission_plan(waypoints, altitude, speed, is_fly_through=True, loiter_time=float("nan"), vehicle_action=float("nan")): 
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
                loiter_time, 
                float("nan"), 
                float("nan"), 
                float("nan"), 
                vehicle_action
            )
        )

    return MissionPlan(mission_items)

def plan_from_boundaries(boundaries, altitude=3, speed=2, is_fly_through=True, loiter_time=float("nan"), vehicle_action=float("nan")):
    """
    Generates a mission plan from the given boundaries and parameters
    inputs:
    - boundaries: list of dictionaries, each containing a lat and lng key
    - altitude: float, the altitude of the mission
    - speed: float, the speed of the mission
    - is_fly_through: boolean, whether the drone should fly through the waypoints
    - loiter_time: float, the time to loiter at each waypoint
    - vehicle_action: MissionItem.VehicleAction, the action to take at each waypoint
    """
    converted_boundaries = [lat_lng_to_xy(point["lat"], point["lng"]) for point in boundaries]
    waypoints = generate_waypoints_from_boundaries(converted_boundaries)
    ll_waypoints = [xy_to_ll(point["x"], point["y"]) for point in waypoints]
    return generate_mission_plan(ll_waypoints, altitude, speed, is_fly_through, loiter_time, vehicle_action)


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

    # ## EXAMPLE USAGE or plan_from_boundaries
    # # convert boundaries to xy
    # converted_boundaries = [lat_lng_to_xy(point["lat"], point["lng"]) for point in example_boundaries]
    # # generate waypoints through boundaries
    # waypoints = generate_waypoints_from_boundaries(converted_boundaries)
    # visualize_waypoints_xy(waypoints, converted_boundaries)

    # # convert waypoints to lat and lng
    # ll_waypoints = [xy_to_ll(point["x"], point["y"]) for point in waypoints]
    # visualize_waypoints_ll(ll_waypoints, example_boundaries)

    # # create mission plan
    # mission_plan = generate_mission_plan(ll_waypoints)
    # print(mission_plan)

    ### TESTING OCCUPANCY GRID
    # boundaries to xy
    converted_boundaries = [lat_lng_to_xy(point["lat"], point["lng"]) for point in example_boundaries]
    # generate occupancy grid
    occupancy_grid = generate_occupancy_grid(converted_boundaries, 0.25)
    visualize_occupancy_grid(occupancy_grid)




