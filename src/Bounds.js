import React, { Component } from 'react';

// create one window resize listener for all bounds
window.addEventListener('resize', () => Bounds.instances.forEach(i => i.handleResize()));

class Bounds extends Component
{
	
	constructor(props)
	{
		super(props);
		this.state = { display: this.shouldDisplay() };
	}

	componentDidMount()
	{
		// push to the instances array
		Bounds.instances.push(this);
	}

	componentWillUnmount()
	{
		// remove it once it has been unmounted
		Bounds.instances.splice(Bounds.instances.indexOf(this), 1);
	}


	shouldDisplay()
	{
		const w = window.innerWidth;
		const h = window.innerHeight;
		const { minWidth, maxWidth, minHeight, maxHeight } = this.getParams();

		return !(
			(maxWidth !== undefined && w > maxWidth) ||
			(minWidth !== undefined && w < minWidth) || 
			(maxHeight !== undefined && h > maxHeight) ||
			(minHeight !== undefined && h < minHeight)
		);
	}

	render()
	{
		if (typeof(this.props.render) !== 'function')
		{
			throw 'Bounds: Expecting render property to be a callback function';
			return null;
		}

		if (this.props.else && typeof(this.props.else) !== 'function')
		{
			throw 'Bounds: Else property should be a callback function';
			return null;
		}

		if (this.state.display)
			return this.props.render();
		else if (this.props.else)
			return this.props.else();
		else
			return null;
	}

	getParams()
	{
		const profile = this.props.profile;

		if (profile) return this.getProfile(profile);
		if (this.props.small) return Bounds.profiles.small;
		if (this.props.medium) return Bounds.profiles.medium;

		if (this.props.from && this.props.to)
		{
			const f = this.getProfile(this.props.from);
			const t = this.getProfile(this.props.to);

			return {
				minWidth: f.minWidth || undefined,
				maxWidth: t.maxWidth || t.minWidth || undefined
			};
		}

		return this.props;
	}


	// determine profile using the string name or return the profile object
	getProfile(profile)
	{
		if (typeof(profile) === 'string')
			return Bounds.profiles[profile];
		else
			return profile;
	}

	handleResize()
	{
		// update the <Bounds /> component state, which will then update
		// child components
		this.setState({ display: this.shouldDisplay() });
	}

}


// static properties and functions - will convert to use static keyword inside class
// when available in Babel

// standard profiles - to be revised
Bounds.profiles = {
	small: { maxWidth: 600 },
	medium: { minWidth: 800 },
	large: { minWidth: 1000 }
};

// store Bounds component instances to trigger on resize
Bounds.instances = [];


// create a new component using specific parameters
// 
// Example:
// const Mobile = Bounds.create({ maxWidth: 600 });
//
// Component usage example:
// <Mobile render={() => <div>Render me on a mobile device</div>} />

Bounds.create = function (params)
{
	return (props) => React.createElement(Bounds, { ...props, ...params });
}



export default Bounds;
