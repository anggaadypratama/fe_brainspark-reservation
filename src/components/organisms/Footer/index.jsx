import React from "react";
import {Typography, IconButton, Link} from "@material-ui/core";
import classNames from "classnames";
import {Instagram, Line} from "@assets/image";
import FooterStyle from "./style";

const Footer = () => {
	const classes = FooterStyle();
	const contactClassnames = classNames(classes.contact, classes.content);
	const titleClassnames = classNames(classes.titleInformation, classes.content);
	const copyrightClassnames = classNames(classes.copyright, classes.content);

	return (
		<>
			<div className={classes.imgWave} alt="footer">
				<div className={classes.bottomContent}>
					<Typography variant="h6" className={titleClassnames}>
						FOR MORE INFORMATION
					</Typography>
					<div className={contactClassnames}>
						<Link href="https://www.instagram.com/rplgdc_/">
							<IconButton>
								<img src={Instagram} alt="instagram" height="34" width="34" />
							</IconButton>
						</Link>
						<Link href="http://line.me/ti/p/~%40ajh8699v">
							<IconButton>
								<img src={Line} alt="line" height="34" width="34" />
							</IconButton>
						</Link>
					</div>
					<Typography className={copyrightClassnames}>
						© All Right Reserved
					</Typography>
				</div>
			</div>
		</>
	);
};

export default Footer;
