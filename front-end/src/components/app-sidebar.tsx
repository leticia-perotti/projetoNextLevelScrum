import React, { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { BookOpen, Settings2, SquareTerminal, UsersRound } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useContext(AuthContext);

	const data = {
		user: {
			name: user?.username || 'Usuário',
			avatar: './images/userImage.png',
		},
		navMain: [
			{
				title: 'Presença',
				url: '#',
				icon: UsersRound,
				items: [
					{
						title: 'Presença Aluno',
						url: '/presenca',
					},
				],
			},
			{
				title: 'Financeiro',
				url: '#',
				icon: Settings2,
				items: [
					{
						title: 'Mensalidade',
						url: '/mensalidade',
					},
					{
						title: 'Financeiro',
						url: '#',
					},
					{
						title: 'Planos',
						url: '/planos',
					},
				],
			},
			{
				title: 'Operações',
				url: '#',
				icon: BookOpen,
				items: [
					{
						title: 'Equipamentos',
						url: '/equipamentos',
					},
				],
			},
			{
				title: 'Recursos Humanos',
				url: '#',
				icon: SquareTerminal,
				items: [
					{
						title: 'Alunos',
						url: '/alunos',
					},
					{
						title: 'Usuarios',
						url: '/usuarios',
					},
					{
						title: 'Controle de presenças',
						url: '/presenca',
					},
				],
			},
		],
	};

	return (
		<Sidebar variant="sidebar" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<div>
										<img src="../images/favicon.ico" />
									</div>
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Academia</span>
									<span className="truncate text-xs">Next Level</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
