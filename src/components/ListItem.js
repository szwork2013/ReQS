import React from 'react';
import { Button, Row, Col, Card, Icon, Badge } from 'antd';
import cx from 'classnames';
import moment from 'moment';
import { Link } from 'dva/router';

import styles from './ListItem.less';

function ListItem(props) {
  const question = props.question;

  return (
    <div className={styles.wrap}>
      <div className={styles.q_avatar}>
        <Link to={`/people/${question.author._id && question.author._id}`}><img alt={question.author.username} src={question.author.avatar} style={{ width: '48px', height: '48px', borderRadius: '24px', backgroundSize: 'contain' }} /></Link>
      </div>
      <div className={styles.q_info}>
        <div className={styles.title}>
          <Link to={`/question/${question._id}`} className={styles.title_strong}>
            {question.title}
            {
                  question.excellent === 1 && (
                    <Icon type="heart" style={{ color: '#F44336', marginLeft: '10px', marginRight: '5px', lineHeight: '30px', fontSize: '22px' }} />
                  )
            }
          </Link>
        </div>
        <div className={styles.q_detail}>
          <Link to={`/people/${question.author._id}`}>{question.author.username}</Link>&nbsp;•&nbsp;提问于&nbsp;{moment(question.creationDate).fromNow()}&#x3000;
          <span>{question.pv}&nbsp;浏览</span>
        </div>
      </div>
      <div className={styles.q_replies_count}>
        {question.answer.length}<span className={styles.span_count}>回答</span>
      </div>
    </div>
  );
}

export default ListItem;
