import { Progress, Typography, Card } from "antd";

const { Text } = Typography;

const CardProgress = ({ title, grade, additional, progress, progressColor }) => {
	return (
		<Card className="progress-card">
			<Typography.Title level={4}>{title}</Typography.Title>
			<Text style={{ fontSize: "20px" }}>{grade}</Text> <Text>{additional}</Text>
			<Progress
				status="active"
				strokeColor={progressColor}
				percent={progress}
				showInfo={false}
			></Progress>
		</Card>
	);
};

export default CardProgress;
