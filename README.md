# react-bounds-simple
A React component to simplify working with multiple screen resolutions / devices. Child components are only rendered if the screen size matches the specified parameters.

### Usage

~~~~
<Bounds 
    maxWidth="600"
    render={() => (
        <div>Render this when screen is within 600px wide</div>
    )}
    else={() => (
        <div>You can render for everything else using the else property</div>
    )}
/>
~~~~

### Create a custom component with parameters
~~~~
const Mobile = Bounds.create({ maxWidth: 600 });

<Mobile
    render={() => <div>Render for mobile</div>}
    else={() => <div>Render for everything else</div>}
/>
~~~~

