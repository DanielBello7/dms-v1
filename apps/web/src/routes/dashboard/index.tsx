import { Protect } from "@/components/security";
import { Route } from "react-router";
import {
  ConversationsPage,
  ProfilePage,
  DashboardLayoutPage,
  UserDetailsPage,
  ConversationDetailsPage,
  CreateConversationPage,
  SecurityPage,
} from "@/pages";
import { SettingsPage } from "@/pages/dashboard/settings/settings";

// prettier-ignore
export const DashboardRoutes = () => {
	return (
		<Route element={<Protect />}>
			<Route>
				<Route path="/dashboard" element={<DashboardLayoutPage />}>
					<Route element={<ConversationsPage />} index />
					<Route path="conversations" element={<ConversationsPage />}>
					  <Route path=":id" element={<ConversationDetailsPage />} />
          </Route>
          <Route path="conversations/create" element={<CreateConversationPage />} />
					<Route path="user/:id" element={<UserDetailsPage />} />
					<Route path="profile" element={<ProfilePage />} />
					<Route path="security" element={<SecurityPage />} />
					<Route path="settings" element={<SettingsPage />} />
				</Route>
			</Route>
		</Route>
	);
};
