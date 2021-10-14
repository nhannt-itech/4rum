import { Card, Avatar } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import CommentArea from './comment-area';
import { useState } from 'react';
import './post-detail.styles.scss';

export const PostDetailPage = () => {
	const post = {
		ImageUrl:
			'https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/143887425_229254258845639_1889614086996814793_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=kZ-sg--OiGMAX-MbHwk&_nc_ht=scontent.fsgn2-3.fna&oh=5528460743f3ba96785635495f77f07a&oe=617F4F9A',
		Title: 'Đây là một bài viết vui',
		UpVote: 10,
		DownVote: 100,
		Summary:
			'Khóa học lập trình C cho người mới bắt đầu. Khóa học này sẽ rất là tuyệt vời và thú vị, khiến bạn sẽ không buồn chán trong việc học lập trình',
		CreateAt: '10 giờ trước',
		CreateBy: 'Nguyễn Thanh Nhân',
		TotalComment: 100,
	};

	const [vote, setVote] = useState(0);

	const handleVote = (type) => {
		if (type === 'upVote') {
			vote === 1 ? setVote(0) : setVote(1);
		} else {
			vote === -1 ? setVote(0) : setVote(-1);
		}
	};

	return (
		<div className='post-detail-page'>
			<Card className='content-area'>
				<Card.Meta
					avatar={
						<div className='panel'>
							<Avatar className='avatar' src={post.ImageUrl} />
							<div className='post-vote'>
								<CaretUpOutlined
									onClick={() => handleVote('upVote')}
									style={vote === 1 ? { color: '#648afc' } : null}
									className='vote-button'
								/>
								<br />
								<div className='vote-number'>100</div>
								<CaretDownOutlined
									onClick={() => handleVote('downVote')}
									style={vote === -1 ? { color: '#F64D4D' } : null}
									className='vote-button'
								/>
							</div>
						</div>
					}
					description={
						<div style={{ textAlign: 'justify' }}>
							<h2>Con đường mình trở thành Software Engineer ở Singapore</h2>
							Contrary to popular belief, Lorem Ipsum is not simply random text. It has
							roots in a piece of classical Latin literature from 45 BC, making it over
							2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
							College in Virginia, looked up one of the more obscure Latin words,
							consectetur, from a Lorem Ipsum passage, and going through the cites of the
							word in classical literature, discovered the undoubtable source. Lorem Ipsum
							comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
							(The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a
							treatise on the theory of ethics, very popular during the Renaissance. The
							first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
							in section 1.10.32.Contrary to popular belief, Lorem Ipsum is not simply
							random text. It has roots in a piece of classical Latin literature from 45
							BC, making it over 2000 years old. Richard McClintock, a Latin professor at
							Hampden-Sydney College in Virginia, looked up one of the more obscure Latin
							words, consectetur, from a Lorem Ipsum passage, and going through the cites
							of the word in classical literature, discovered the undoubtable source.
							Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum
							et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
							This book is a treatise on the theory of ethics, very popular during the
							Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
							comes from a line in section 1.10.32. Contrary to popular belief, Lorem
							Ipsum is not simply random text. It has roots in a piece of classical Latin
							literature from 45 BC, making it over 2000 years old. Richard McClintock, a
							Latin professor at Hampden-Sydney College in Virginia, looked up one of the
							more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
							through the cites of the word in classical literature, discovered the
							undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
							"de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
							written in 45 BC. This book is a treatise on the theory of ethics, very
							popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum
							dolor sit amet..", comes from a line in section 1.10.32. Contrary to popular
							belief, Lorem Ipsum is not simply random text. It has roots in a piece of
							classical Latin literature from 45 BC, making it over 2000 years old.
							Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
							looked up one of the more obscure Latin words, consectetur, from a Lorem
							Ipsum passage, and going through the cites of the word in classical
							literature, discovered the undoubtable source. Lorem Ipsum comes from
							sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
							Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a
							treatise on the theory of ethics, very popular during the Renaissance. The
							first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
							in section 1.10.32.
						</div>
					}
				/>
			</Card>
			<CommentArea />
		</div>
	);
};
