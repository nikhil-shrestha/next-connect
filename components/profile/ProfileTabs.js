import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Post from '../index/Post';
import FollowTab from './FollowTab';

const ProfileTabs = (props) => {
  const [tab, setTab] = useState(0);

  const {
    posts,
    user,
    auth,
    handleDeletePost,
    handleToggleLike,
    handleAddComment,
    handleDeleteComment,
  } = props;

  const handleTabChange = (event, value) => setTab(value);

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="secondary"
          fullWidth
        >
          <Tab label="Posts" />
          <Tab label="Following" />
          <Tab label="Follower" />
        </Tabs>
      </AppBar>
      {tab === 0 && (
        <TabContainer>
          {posts.map((post) => (
            <Post
              key={post._id}
              auth={auth}
              post={post}
              handleDeletePost={handleDeletePost}
              handleToggleLike={handleToggleLike}
              handleAddComment={handleAddComment}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
        </TabContainer>
      )}
      {tab === 1 && (
        <TabContainer>
          <FollowTab users={user.following} />
        </TabContainer>
      )}
      {tab === 2 && (
        <TabContainer>
          <FollowTab users={user.followers} />
        </TabContainer>
      )}
    </div>
  );
};

const TabContainer = ({ children }) => (
  <Typography component="div" style={{ padding: '1em' }}>
    {children}
  </Typography>
);

export default ProfileTabs;
