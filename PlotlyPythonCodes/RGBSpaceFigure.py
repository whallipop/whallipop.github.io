import plotly.graph_objects as go
import numpy as np
X, Y, Z = np.mgrid[0:255:10, :255:10, :255:10]
values = (X + Y * 256 + Z * 256 * 256) / (256 * 256 * 256)


layout = go.Layout(
    margin=go.layout.Margin(
        l=0, #left margin
        r=0, #right margin
        b=0, #bottom margin
        t=0,  #top margin
    ),
)

fig = go.Figure(data=[
    # go.Mesh3d(
    #     # 4 vertices of a quad
    #     x=[0, 0, 1, 1],
    #     y=[0, 1, 0, 1],
    #     z=[0, 0, 0, 0],
    #     colorbar_title='z',
    #     # colorscale=[[0, 'rgb(0, 0, 0)'],
    #     #             [0.333, 'rgb(255, 0, 0)'],
    #     #             [0.666, 'rgb(0, 255, 0)'],
    #     #             [1, 'rgb(255, 255, 0)']],
    #     vertexcolor = [[0, 0, 0],[255, 0, 0],[0, 255,0],[255, 255, 0]],
    #     # Intensity of each vertex, which will be interpolated and color-coded
    #     # intensity = np.linspace(0, 1, 4, endpoint=True),
    #     # i, j and k give the vertices of triangles
    #     i = [0,0],
    #     j = [1,3],
    #     k = [3,2],
    #     name='y',
    #     showscale=False,
    #     opacity=0.5
    # )
    go.Mesh3d(
        # 8 vertices of a cube
        x=[0, 0, 1, 1, 0, 0, 1, 1],
        y=[0, 1, 1, 0, 0, 1, 1, 0],
        z=[0, 0, 0, 0, 1, 1, 1, 1],
        vertexcolor = [
            [0, 0, 0],[0, 255, 0],
            [255, 255, 0],[255, 0, 0],
            [0, 0, 255],[0, 255, 255],
            [255, 255,255],[255, 0, 255]],
        # i, j and k give the vertices of triangles
        i = [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
        j = [3, 4, 1, 2, 5, 6, 5, 1, 0, 1, 7, 3],
        k = [0, 7, 2, 3, 6, 7, 1, 2, 5, 5, 6, 6],
        showscale=False,
        # opacity=0.50
    ),
    ], layout=layout)
# fig.update_traces(showscale=False)
fig.show()
fig.write_json("test.json")