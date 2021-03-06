import {CardItem, EmptyEvent, Filter} from "@components/molecules";
import {Grid} from "@material-ui/core";
import Fade from "react-reveal/Fade";
import React from "react";

import PropTypes from "prop-types";
import classNames from "classnames";

import {useScreenSize} from "@assets";
import {Loading} from "@components";
import {
	LazyLoadComponent,
	trackWindowScroll,
} from "react-lazy-load-image-component";
import listCardStyle from "./style";

const ListCard = ({
	dataFilter,
	cardData,
	hasFilter,
	className,
	canEdit,
	onChange,
	filterState,
	isLoading,
	scrollPosition,
	...rest
}) => {
	const mobileSize = useScreenSize({isMax: true, size: 1000});
	const classes = listCardStyle({mobileSize});
	const listCardClassname = classNames(className, classes.content);

	return (
		<div className={listCardClassname}>
			{hasFilter && (
				<div className={classes.filter}>
					<span className={classes.totalItem}>Result : {cardData.length}</span>
					<Filter
						filterState={filterState}
						data={dataFilter}
						onChange={e => onChange(e)}
					/>
				</div>
			)}
			{isLoading ? (
				<Loading />
			) : (
				<div className={classes.content}>
					<Grid container spacing={4}>
						{cardData.length ? (
							cardData?.map(
								({
									_id: id,
									themeName: title,
									imagePoster,
									location,
									date,
									eventStart,
									isEventDone,
								}) => (
									<Grid key={id} item {...rest}>
										<Fade bottom>
											<LazyLoadComponent scrollPosition={scrollPosition}>
												<CardItem
													id={id}
													title={title}
													img={imagePoster}
													canEdit={canEdit}
													location={location}
													date={date}
													time={eventStart}
													status={isEventDone}
												/>
											</LazyLoadComponent>
										</Fade>
									</Grid>
								)
							)
						) : (
							<EmptyEvent message="It looks like there is no event for now" />
						)}
					</Grid>
				</div>
			)}
		</div>
	);
};

ListCard.propTypes = {
	dataFilter: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.object, PropTypes.string])
	),
	className: PropTypes.string,
	hasFilter: PropTypes.bool,
	cardData: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.object, PropTypes.string])
	),
	canEdit: PropTypes.bool,
	onChange: PropTypes.func,
	filterState: PropTypes.number,
	isLoading: PropTypes.bool,
	scrollPosition: PropTypes.number.isRequired,
};

ListCard.defaultProps = {
	dataFilter: [],
	className: "",
	hasFilter: false,
	cardData: [],
	canEdit: false,
	onChange: () => {},
	filterState: 0,
	isLoading: false,
};

export default trackWindowScroll(ListCard);
