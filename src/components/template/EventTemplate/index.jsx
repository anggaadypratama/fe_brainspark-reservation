/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from "react";
import {Typography, Container, Card} from "@material-ui/core";

import {useScreenSize} from "@assets";
import {Info, Header} from "@components";

import PropTypes from "prop-types";
import {Skeleton} from "@material-ui/lab";
import DetailEventStyle from "./style";
import GeneralUserTemplate from "../GeneralUserTemplate";

const EventTemplate = ({children, dataContent, isLoading}) => {
	const isMedium = useScreenSize({isMax: true, size: 900});
	const isPhone = useScreenSize({isMax: true, size: 400});
	const classes = DetailEventStyle({isMedium, isPhone});

	const heading = isPhone ? "h5" : "h4";

	return (
		<>
			<GeneralUserTemplate>
				<Container maxWidth="md" className={classes.containerContent}>
					<Card elevation={0} className={classes.content}>
						<Typography variant={heading} className={classes.contentTitle}>
							{isLoading ? (
								<Skeleton animation="wave" />
							) : (
								dataContent?.themeName
							)}
						</Typography>
						<Header isLoading={isLoading} speaker={dataContent?.speakerName} />
						<section>{children}</section>
					</Card>
					<Info
						position="sticky"
						isLoading={isLoading}
						dataContent={dataContent}
					/>
				</Container>
			</GeneralUserTemplate>
		</>
	);
};

EventTemplate.propTypes = {
	children: PropTypes.node,
	dataContent: PropTypes.oneOfType([
		PropTypes.objectOf(PropTypes.object),
		PropTypes.string,
	]),
	isLoading: PropTypes.bool,
};

EventTemplate.defaultProps = {
	children: "",
	dataContent: {},
	isLoading: false,
};

export default EventTemplate;
