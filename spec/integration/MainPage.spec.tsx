import { render, screen, fireEvent, within } from "@testing-library/react";
import { JestStoreProvider } from "../utils/JestStoreProvider.tsx";
import { act } from "react-dom/test-utils";
import MainPage from "pages/main/index.tsx";
import { BrowserRouter } from "react-router-dom"

jest.mock('shared/hooks', () => ({
    ...(jest.requireActual('shared/hooks')),
    useFirebaseDb: () => ({
        fetchProjects: jest.fn(),
        loading: false,
        addProject: jest.fn(),
    }),
}));

describe("Проверка главной страницы", () => {
    it("Открые формы создания проекта", async () => {
        await act(async () => {
            render(<BrowserRouter><MainPage /></BrowserRouter>, {
                wrapper: JestStoreProvider,
            });
        });
        const noProjects = screen.getByText('Нет проектов');
        expect(noProjects).toBeInTheDocument();

        const createProjectButton = screen.getByText('Добавить первый проект');
        expect(createProjectButton).toBeInTheDocument();

        fireEvent.click(createProjectButton);

        const createModal = screen.getByTestId('create-project-modal');
        expect(createModal).toBeInTheDocument();

        const nameInput = screen.getByPlaceholderText('Название');
        expect(nameInput).toBeInTheDocument();

        fireEvent.input(nameInput, { target: { value: 'Первый проект' } });

        const addProjectButton = screen.getByText('Создать');
        expect(addProjectButton).toBeInTheDocument();

        fireEvent.click(addProjectButton);

        const projectCard = screen.getByTestId('project-card');
        expect(projectCard).toBeInTheDocument();

        const projectInList = within(projectCard).getByText('Первый проект');
        expect(projectInList).toBeInTheDocument();

    });
});


