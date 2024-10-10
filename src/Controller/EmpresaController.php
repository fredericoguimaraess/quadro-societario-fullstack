<?php

namespace App\Controller;

use App\Entity\Empresa;
use App\Repository\EmpresaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/empresa')]
class EmpresaController extends AbstractController
{
    private $entityManager;
    private $empresaRepository;

    public function __construct(EntityManagerInterface $entityManager, EmpresaRepository $empresaRepository)
    {
        $this->entityManager = $entityManager;
        $this->empresaRepository = $empresaRepository;
    }

    #[Route('/', methods: ['GET'])]
    public function index(): Response
    {
        $empresas = $this->empresaRepository->findAll();

        $data = [];
        foreach ($empresas as $empresa) {
            $socios = [];
            foreach ($empresa->getSocios() as $socio) {
                $socios[] = [
                    'id' => $socio->getId(),
                    'nome' => $socio->getNome(),
                ];
            }

            $data[] = [
                'id' => $empresa->getId(),
                'nome' => $empresa->getNome(),
                'socios' => $socios,
            ];
        }

        return $this->json($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(int $id): Response
    {
        $empresa = $this->empresaRepository->find($id);

        if (!$empresa) {
            return $this->json(['message' => 'Empresa não encontrada'], Response::HTTP_NOT_FOUND);
        }

        $socios = [];
        foreach ($empresa->getSocios() as $socio) {
            $socios[] = [
                'id' => $socio->getId(),
                'nome' => $socio->getNome(),
            ];
        }

        $data = [
            'id' => $empresa->getId(),
            'nome' => $empresa->getNome(),
            'socios' => $socios,
        ];

        return $this->json($data);
    }

    #[Route('/', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $empresa = new Empresa();
        $empresa->setNome($data['nome']);

        $this->entityManager->persist($empresa);
        $this->entityManager->flush();

        return $this->json($empresa, Response::HTTP_CREATED);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $request, int $id): Response
    {
        $empresa = $this->empresaRepository->find($id);
        if (!$empresa) {
            return $this->json(['message' => 'Empresa não encontrada'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if (!isset($data['nome'])) {
            return $this->json(['message' => 'O campo nome é obrigatório'], Response::HTTP_BAD_REQUEST);
        }

        $empresa->setNome($data['nome']);

        $this->entityManager->flush();

        return $this->json([
            'id' => $empresa->getId(),
            'nome' => $empresa->getNome(),
        ]);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(int $id): Response
    {
        $empresa = $this->empresaRepository->find($id);
        if (!$empresa) {
            return $this->json(['message' => 'Empresa não encontrada'], Response::HTTP_NOT_FOUND);
        }

        foreach ($empresa->getSocios() as $socio) {
            $socio->setEmpresa(null);
            $this->entityManager->persist($socio);
        }

        $this->entityManager->remove($empresa);
        $this->entityManager->flush();

        return $this->json(['message' => 'Empresa removida com sucesso, sócios desvinculados']);
    }
}
